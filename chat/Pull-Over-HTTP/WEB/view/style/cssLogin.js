function CSSLogin()

{
    return `
    html 
    {
        height: 100%;
    }
    body 
    {
    margin:0;
    padding:0;
    font-family: sans-serif;
    background: linear-gradient(#141e30, #243b55);
    }
    
    .login-box 
    {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 360px;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,.5);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
    }
    
    .login-box h2 
    {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
    }
    
    .login-box .user-box 
    {
    position: relative;
    }
    
    .login-box .user-box input 
    {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
    }
    .login-box .user-box label 
    {
    position: absolute;
    top:0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
    }
    
    .login-box .user-box input:focus ~ label,
    .login-box .user-box input:valid ~ label 
    {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
        !important
    }
    .login-box button 
    {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
    background-color: transparent;
    border: none;
    }
    
    .login-box button:hover 
    {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
    }
    
    .login-box button span 
    {
    position: absolute;
    display: block;
    }
    
    .login-box button span:nth-child(1) 
    {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
    }
    
    @keyframes btn-anim1 
    {
    0% 
    {
        left: -100%;
    }
    50%,100% 
    {
        left: 100%;
    }
    }
    
    .login-box button span:nth-child(2) 
    {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
    }
    
    @keyframes btn-anim2 
    {
    0% 
    {
        top: -100%;
    }
    50%,100% 
    {
        top: 100%;
    }
    }
    
    .login-box button span:nth-child(3) 
    {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
    }
    
    @keyframes btn-anim3 
    {
    0% 
    {
        right: -100%;
    }
    50%,100% 
    {
        right: 100%;
    }
    }
    
    .login-box button span:nth-child(4) 
    {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
    }
    
    @keyframes btn-anim4 
    {
    0% 
    {
        bottom: -100%;
    }
    50%,100% 
    {
        bottom: 100%;
    }
    }
    .signin-box {
        position: absolute;
        color: #fff;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px; /* Make it wider */
        padding: 20px;
        background: rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center; /* Center-align content horizontally */
    }
    
    .signin-box .user-box-container {
        display: flex;
        flex-wrap: wrap; /* Allow user boxes to wrap to the next row */
        justify-content: space-between; /* Distribute user boxes evenly */
        width: 100%; /* Ensure the user boxes take up the full width */
    }
    
    .signin-box .user-box {
        width: calc(33.33% - 20px); /* Calculate the width for three user boxes per row with margin */
        margin-bottom: 20px;
    }
    
    .signin-box .user-box label {
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: 0.5s;
        opacity: 0.7;
        position: relative;
        top: -20px;
    }
    
    .signin-box .user-box input {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        color: #fff;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
    }
    

    .signin-box button 
    {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
    background-color: transparent;
    border: none;
    }
    .signin-box button 
    {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 4px;
    background-color: transparent;
    border: none;
    }
    .signin-box .user-box input:focus ~ label,
    .signin-box .user-box input:valid ~ label 
    {
        top: -20px;
        left: 0;
        color: #03e9f4;
        font-size: 12px;
        !important
    }
    .signin-box button:hover 
    {
    background: #03e9f4;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
    }
    
    `
}

export {CSSLogin};