import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import {
    getCategories,
} from "../../../functions/categories";
import {
    createSub,
    getSub,
    removeSub, updateSub,
} from "../../../functions/sub";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";

function SubUpdate() {
    const history = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState("");

    const [keyword, setKeyword] = useState("");
    const [sub, setSubs] = useState([]);

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));
    let { slug } = useParams();
    const loadSub = () =>
        getSub(slug).then((s) => {
            setName(s.data.name)
            setParent(s.data.parent)
            setSubs(s.data)
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSub(slug,{ name, parent: parent }, user.token)
            .then((res) => {
                console.log(res.message);
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} is updated`);
                history('admin/sub');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };


    const categoryFrom = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        autoFocus
                        required
                    />
                    <br />
                    <button className="btn btn-outline-primary">Save</button>
                </div>
            </form>
        );
    };


    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Update Sub Category</h4>
                    )}
                    <div className="form-group">
                        <label>Parent Category</label>
                        <select name="category" className="form-control" onChange={(e)=>setParent(e.target.value)} >
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>))}
                        </select>
                    </div>
                    {categoryFrom()}

                </div>
            </div>
        </div>
    );
}

export default SubUpdate;
