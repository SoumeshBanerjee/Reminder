import axios from "axios"
axios.defaults.withCredentials = true
export default class ReminderManager {
    static async getAllReminders(){
        return await axios.get('/reminders')
    }
    static async deleteReminder(id){
        return await axios.delete(`/reminders/${id}`)
    }
    static async markDoneReminder(id){
        return await axios.patch(`/reminders/done/${id}`)
    }
    static async markUnDoneReminder(id){
        return await axios.patch(`/reminders/undone/${id}`)
    }
    static async createReminder(payload){
        return await axios.post('/reminders', payload)
    }
    static async updateReminder(id, payload){
        return await axios.patch(`/reminders/${id}`, payload)
    }
}