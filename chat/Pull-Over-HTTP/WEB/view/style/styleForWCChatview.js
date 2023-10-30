let getChatStyle = () =>
{
    return `
    @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700);
    @import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);

    html, body {
        background: #e5e5e5;
        font-family: 'Lato', sans-serif;
        margin: 0px auto;
    }
    ::selection{
        background: rgba(82,179,217,0.3);
        color: inherit;
    }
    a{
        color: rgba(82,179,217,0.9);
    }
    .menu {
        position: fixed;
        top: 0px;
        // left: 0px;
        right: 0px;
        width: 80%;
        height: 50px;
        background: rgba(82,179,217,0.9);
        z-index: 100;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
    
    .back {
        position: absolute;
        width: 90px;
        height: 50px;
        top: 0px;
        left: 0px;
        color: #fff;
        line-height: 50px;
        font-size: 30px;
        padding-left: 10px;
        cursor: pointer;
    }
    .back img {
        position: absolute;
        top: 5px;
        left: 30px;
        width: 40px;
        height: 40px;
        background-color: rgba(255,255,255,0.98);
        border-radius: 100%;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        -ms-border-radius: 100%;
        margin-left: 15px;
        }
    .back:active {
        background: rgba(255,255,255,0.2);
    }
    .name{
            position: absolute;
            top: 3px;
            left: 110px;
            font-family: 'Lato';
            font-size: 25px;
            font-weight: 300;
            color: rgba(255,255,255,0.98);
            cursor: default;
        }
        .last{
            position: absolute;
            top: 30px;
            left: 115px;
            font-family: 'Lato';
            font-size: 11px;
            font-weight: 400;
            color: rgba(255,255,255,0.6);
            cursor: default;
        }
        
        /* M E S S A G E S */
        
        .chat {
            list-style: none;
            background: none;
            margin: 0;
            padding: 0 0 50px 0;
            margin-top: 60px;
            margin-bottom: 10px;
        }
        .chat li {
            padding: 0.5rem;
            overflow: hidden;
            display: flex;
        }
        .chat .avatar {
            width: 40px;
            height: 40px;
            position: relative;
            display: block;
            z-index: 2;
            border-radius: 100%;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            -ms-border-radius: 100%;
            background-color: rgba(255,255,255,0.9);
        }
        .chat .avatar img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            -ms-border-radius: 100%;
            background-color: rgba(255,255,255,0.9);
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
        .chat .day {
            position: relative;
            display: block;
            text-align: center;
            color: #c0c0c0;
            height: 20px;
            text-shadow: 7px 0px 0px #e5e5e5, 6px 0px 0px #e5e5e5, 5px 0px 0px #e5e5e5, 4px 0px 0px #e5e5e5, 3px 0px 0px #e5e5e5, 2px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 1px 0px 0px #e5e5e5, 0px 0px 0px #e5e5e5, -1px 0px 0px #e5e5e5, -2px 0px 0px #e5e5e5, -3px 0px 0px #e5e5e5, -4px 0px 0px #e5e5e5, -5px 0px 0px #e5e5e5, -6px 0px 0px #e5e5e5, -7px 0px 0px #e5e5e5;
            box-shadow: inset 20px 0px 0px #e5e5e5, inset -20px 0px 0px #e5e5e5, inset 0px -2px 0px #d7d7d7;
            line-height: 38px;
            margin-top: 5px;
            margin-bottom: 20px;
            cursor: default;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
    .other .msg {
            order: 1;
            border-top-left-radius: 0px;
            box-shadow: -1px 2px 0px #D4D4D4;
        }
        .other:before {
            content: "";
            position: relative;
            top: 0px;
            right: 0px;
            left: 40px;
            width: 0px;
            height: 0px;
            border: 5px solid #fff;
            border-left-color: transparent;
            border-bottom-color: transparent;
        }
        
        .self {
            justify-content: flex-end;
            align-items: flex-end;
        }
        .self .msg {
            order: 1;
            border-bottom-right-radius: 0px;
            box-shadow: 1px 2px 0px #D4D4D4;
        }
        .self .avatar {
            order: 2;
        }
        .self .avatar:after {
            content: "";
            position: relative;
            display: inline-block;
            bottom: 19px;
            right: 0px;
            width: 0px;
            height: 0px;
            border: 5px solid #fff;
            border-right-color: transparent;
            border-top-color: transparent;
            box-shadow: 0px 2px 0px #D4D4D4;
        }
        
        .msg {
            background: white;
            min-width: 50px;
            padding: 10px;
            border-radius: 2px;
            box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.07);
        }
        .msg p {
            font-size: 0.8rem;
            margin: 0 0 0.2rem 0;
            color: #777;
        }
        .msg img {
            position: relative;
            display: block;
            width: 450px;
            border-radius: 5px;
            box-shadow: 0px 0px 3px #eee;
            transition: all .4s cubic-bezier(0.565, -0.260, 0.255, 1.410);
            cursor: default;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }
    @media screen and (max-width: 800px) 
    {
        .msg img 
        {
            width: 300px;
        }
    }
    @media screen and (max-width: 550px) {
        .msg img {
        width: 200px;
    }
    }
    
    .msg time {
        font-size: 0.7rem;
        color: #ccc;
        margin-top: 3px;
        float: right;
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
    .msg time:before{
        content:"\\f017";
        color: #ddd;
        font-family: FontAwesome;
        display: inline-block;
        margin-right: 4px;
    }
    emoji{
            display: inline-block;
            height: 18px;
            width: 18px;
            background-size: cover;
            background-repeat: no-repeat;
            margin-top: -7px;
            margin-right: 2px;
            transform: translate3d(0px, 3px, 0px);
        }
        emoji.please{background-image: url(https://imgur.com/ftowh0s.png);}
        emoji.lmao{background-image: url(https://i.imgur.com/MllSy5N.png);}
        emoji.happy{background-image: url(https://imgur.com/5WUpcPZ.png);}
        emoji.pizza{background-image: url(https://imgur.com/voEvJld.png);}
        emoji.cryalot{background-image: url(https://i.imgur.com/UUrRRo6.png);}
        emoji.books{background-image: url(https://i.imgur.com/UjZLf1R.png);}
        emoji.moai{background-image: url(https://imgur.com/uSpaYy8.png);}
        emoji.suffocated{background-image: url(https://i.imgur.com/jfTyB5F.png);}
        emoji.scream{background-image: url(https://i.imgur.com/tOLNJgg.png);}
        emoji.hearth_blue{background-image: url(https://i.imgur.com/gR9juts.png);}
        emoji.funny{background-image: url(https://i.imgur.com/qKia58V.png);}
        
        @-webikt-keyframes pulse {
          from { opacity: 0; }
          to { opacity: 0.5; }
        }
        
        ::-webkit-scrollbar {
            min-width: 12px;
            width: 12px;
            max-width: 12px;
            min-height: 12px;
            height: 12px;
            max-height: 12px;
            background: #e5e5e5;
            box-shadow: inset 0px 50px 0px rgba(82,179,217,0.9), inset 0px -52px 0px #fafafa;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #bbb;
            border: none;
            border-radius: 100px;
            border: solid 3px #e5e5e5;
            box-shadow: inset 0px 0px 3px #999;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #b0b0b0;
          box-shadow: inset 0px 0px 3px #888;
        }
        
        ::-webkit-scrollbar-thumb:active {
            background: #aaa;
          box-shadow: inset 0px 0px 3px #7f7f7f;
        }
        
        ::-webkit-scrollbar-button {
            display: block;
            height: 26px;
        }
    .messageInput {
        position: fixed;
        bottom: 0px;
        // left: 0px;
        right: 0px;
        width: 70%;
        height: 50px;
        z-index: 99;
        background: #fafafa;
        // background: red;
        border: none;
        outline: none;
        padding-left: 55px;
        padding-right: 55px;
        color: #666;
        font-weight: 400;
    }

    .emojis 
    {
        position: fixed;
        display: block;
        bottom: 8px;
        left: 250;
        width: 34px;
        height: 34px;
        background-image: url(https://i.imgur.com/5WUpcPZ.png);
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 100;
        cursor: pointer;
    }
    .emojis:active {
        opacity: 0.9;
    }
    .send-message-btn {
        position: fixed;
        display: block;
        bottom: 8px;
        right: 0px; /* Mover el botón a la derecha del emoji */
        width: 34px;
        height: 34px;
        background-image: url(https://icons.iconarchive.com/icons/froyoshark/enkel/512/Telegram-icon.png);
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 100;
        cursor: pointer;
        border: none;
    }
        .messaging 
        {
            position: absolute;
            right: 0; /* Coloca la tilde al final a la derecha */
            top: 5px; /* Ajusta la posición vertical según tus necesidades */
            font-size: 20px; /* Ajusta el tamaño de la fuente según tus necesidades */
            color: blue;
        }
        .messageTime 
        {
            position: absolute;
            right: 0; /* Coloca la tilde al final a la derecha */
            bottom: 0; /* Ajusta la posición vertical según tus necesidades */
            font-size: 10px; /* Ajusta el tamaño de la fuente según tus necesidades */
        }
        .sended 
        {
            position: relative;
            text-align: right; /* Alinea la hora a la derecha */
            background-color: #00B300; /* Fondo verde */
            color: #fff; /* Letras blancas */
            padding: 14px;
            margin: 5px;
            border-radius: 10px;
        }
        .received
        {
            position: relative;
            background-color: #000; /* Fondo negro */
            color: #fff; /* Letras blancas */
            padding: 8px;
            margin: 5px;
            border-radius: 10px;
        }
        .selectedUser
        {
            background-color: #2565e7;
        }
        /* Estilos para la lista desplegable */
        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropdown-content {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
            z-index: 1;
        }

        .dropdown:hover .dropdown-content {
            display: block;
        }

        .dropdown-content ul {
            list-style-type: none;
            padding: 0;
        }

        .dropdown-content li {
            padding: 8px;
            text-align: center;
        }

        .dropdown-content li:hover {
            background-color: #ddd;
        }

        
        .sidebar {
            position: fixed;
            top: 50px; /* Altura del menú */
            left: 0px;
            width: 20%; /* Ancho del sidebar */
            height: 120%; /* Ocupará toda la altura disponible */
            background: #253668; /* Color de fondo del sidebar */
            z-index: 99; /* Asegura que el sidebar esté por debajo del menú */
            padding-top: 20px; /* Espacio superior para evitar solapamiento con el menú */
        }
        
        .chat-container {
            margin-left: 250px; /* Ancho del sidebar */
            width: 60%;
            padding: 20px;
        }
        .logout-button {
            position: absolute;
            bottom: 180px;
            left: 25px;
            display: block;
            width: 80%; /* Ajusta el ancho según tus preferencias */
            margin: 20px auto; /* Centra el botón verticalmente */
            padding: 10px 15px;
            background-color: #3498db; /* Color de fondo del botón */
            color: #fff; /* Color del texto */
            font-size: 16px; /* Tamaño de fuente */
            border: none;
            border-radius: 5px; /* Bordes redondeados */
            cursor: pointer;
            transition: background-color 0.3s; /* Transición de color al pasar el ratón */
        
            /* Estilo al pasar el ratón */
        }
        /* Estilo base del botón */
        .logout-button:hover {
        background-color: #2980b9; /* Color de fondo al pasar el ratón */
        }
        .proposal-btn {
            display: inline-block;
            background-color: #3498db; /* Color de fondo */
            color: #fff; /* Color del texto */
            padding: 10px 20px; /* Espaciado interno */
            border: none; /* Sin borde */
            border-radius: 5px; /* Borde redondeado */
            cursor: pointer; /* Cambia el cursor a una mano al pasar el ratón */
            font-size: 16px; /* Tamaño de fuente */
            text-align: center; /* Alineación de texto al centro */
            text-decoration: none; /* Sin subrayado */
        }
        
        /* Cambio de estilo al pasar el ratón sobre el botón */
        .proposal-btn:hover {
            background-color: #258cd1; /* Color de fondo al pasar el ratón */
        }
        
        /* Estilo adicional si se desea un efecto 3D al hacer clic */
        .proposal-btn:active {
            box-shadow: 0 3px 0 #145e8b; /* Sombra para efecto de clic */
        }

        /* Define la animación llamada colorChange */
        @keyframes colorChange {
        0% { color: #3498db; }
        50% { color: #e74c3c; }
        100% { color: #3498db; }
        }

        /* Aplica la animación a los elementos con la clase decorated-span */
        .onlineusers-span {
            width: 80%; /* Ajusta el ancho según tus preferencias */
            margin: 30px auto; /* Centra el botón verticalmente */
            padding: 10px 15px;
            border: none;
            border-radius: 5px; /* Bordes redondeados */
            cursor: pointer;
            display: inline-block;
            font-size: 25px;
            color: #3498db;
            animation: colorChange 5s infinite; /* Aplica la animación automáticamente */
        }
        `
}


export { getChatStyle };