import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'vchiheb@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'vynastya@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false

    },
    {
        name: 'Jane Doe',
        email: 'user@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false

    },
]

export default users;