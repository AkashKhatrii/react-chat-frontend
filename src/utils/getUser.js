import axios from "axios";


export const getUser = async () => {
    const res = await axios.get('https://react-chat-backend.onrender.com/getUser', { withCredentials: true })

    return res
}