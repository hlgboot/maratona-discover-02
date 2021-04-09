const Profile = require("../model/Profile")

// Controladores das rota do Usuário
module.exports = {
    async index (req, res) {
        const data = await Profile.get()

        return res.render("profile.ejs", { profile: data})
    },
    async update (req, res) {
        const data = req.body

        const weeksPerYear = 52
        // Total de semanas trabalhadas por mês
        const workWeeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        // Total de horas trabalhadas por semana
        const workWeekHours = data["hours-per-day"] * data["days-per-week"]
        // Total de horas trabalhadas no mês
        const monthlyWorkHours = workWeekHours * workWeeksPerMonth
        // Valor da hora
        const budgetHour = data["monthly-budget"] / monthlyWorkHours

        const updatedData = {
            ... await Profile.get(),
            ...req.body, 
            "value-hour" : budgetHour
        }
        
        await Profile.update(updatedData)

        return res.redirect("/profile")
            
    }
}