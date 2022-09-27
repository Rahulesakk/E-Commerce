import React from 'react'
import Typewriter from 'typewriter-effect';

function Jumbotoron({text}) {
  return (
    <div>
        <Typewriter
            options={{
                strings: text,
                autoStart: true,
                loop: true,
            }}
            />
    </div>
  )
}

export default Jumbotoron