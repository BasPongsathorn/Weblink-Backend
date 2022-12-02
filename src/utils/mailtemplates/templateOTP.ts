const templateOTP = (OTP: number) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            padding: 0;
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
        }

        .big-container {
            width: 100%;
            background-color: rgb(209, 209, 209);
            display: flex;
            justify-content: center;
        }
        .container {
            width: 50%;
            height: 100vh;
            text-align: center;
            background-color: white;
            display: flex;
            justify-content: center;
        }

        .img {
            display: flex;
            justify-content: center;
        }

        .logo {
            width: 50%;
            height: 250px;
            text-align: center;
            margin-top: 1rem;

        }
        
        .otp {
            display: flex;
            justify-content: center;
        }

        .otp-code{
            margin-top: 10px;
            background-color: #3750A1;
            width: 350px;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        p {
          
            letter-spacing: 5px;
            font-size: 25px;
            color: white;
        }


        .item{
            width: 60%;
        }


    </style>
</head>
<body>
    <div class="big-container">
            <div class="container">
                <div class="item">
                    <div class="img">
                         <img class="logo" src="finXlogo.png"/>
                    </div>
                    <h1>OTP Code for sign in</h1>
                    <h3 style="text-align: left;">Thank you for choosing Weblink. Use this OTP to complete your Sign Up procedures and verify your account on Weblink. Remember, Never share this OTP with anyone.</p>
                    <div class="otp">
                        <div class="otp-code">
                            <p class="text-otp">${OTP}</p>
                        </div>
                    </div>
                    <h3 class="foot1" style="text-align: left; margin-top: 50px;">Best Regards,</h3>
                    <h3 class="foot2" style="text-align: left;">Weblink Administrator</h3>
                 </div>
               
            </div>
    </div>
</body>
</html>
    `;
};

export { templateOTP };
