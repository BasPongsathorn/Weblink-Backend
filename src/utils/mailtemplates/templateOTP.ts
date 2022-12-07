
const templateOTP = (OTP: number) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
                crossorigin="anonymous"
            />
            <title>Document</title>
        </head>
        <body>
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                    <style>
                        body {
                            padding: 0;
                            margin: 0;
                            font-family: Arial, Helvetica, sans-serif;
                            font-family: inherit;
                            font-size: 14px;
                        }
    
                        .header {
                            margin-top: 70px;
    
                            margin-left: 50px;
                        }
    
                        .detail {
                            display: flex;
                            justify-content: center;
                            padding-left: 90px;
                            padding-right: 90px;
                        }
    
                        .container-otp {
                            display: flex;
                            justify-content: center;
                            margin-top: 20px;
                        }
    
                        .otp {
                            padding: 10px 20px 10px 30px;
                            background-color: #3750a1;
                        }
    
                        .otp-num {
                            letter-spacing: 10px;
                            color: white;
                            font-size: 30px;
                        }
    
                        .footer {
                            margin-top: 40px;
                            margin-left: 50px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="incontainer">
                            <div class="mt-5 mx-3">
                                <p>เรื่อง : รหัสผ่านเพื่อยืนยันตัวตนในการเข้าใข้งาน</p>
                                <p>เรียน : ผู้ใช้งาน WeblinkSSC</p>
                            </div>
                            <div class="mx-5">
                                <p>
                                    โปรดนำรหัส (OTP) ด้านล่างนี้ ไปกรอกหน้ายืนยันตัวตนโดยใช้รหัส (OTP)
                                    เพื่อเข้าใช้งานเว็บไซต์ โปรดกรอกรหัสภายในเวลา 15 นาที
                                </p>
                            </div>
                            <div class="container-otp">
                                <div class="otp h3">
                                    <div class="otp-num">${OTP}</div>
                                </div>
                            </div>
                            <div class="footer">
                                <p>ขอแสดงความนับถือ</p>
                                <p>WeblinkSSC</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </body>
    </html>
    `;
};

export { templateOTP };
