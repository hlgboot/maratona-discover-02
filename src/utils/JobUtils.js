module.exports = {
    getRemainingDays (job) {
        //Prazo total
        const remainigDays = Math.floor(job["total-hours"] / job["daily-hours"])
        // Data de criação do projeto formatada
        const createdDate = new Date(job.created_at)
        // Data de entrega do projeto em ms
        const dueDay = createdDate.getDate() + remainigDays
        const dueDate = createdDate.setDate(dueDay)
        // Prazo restante em ms
        const timeDiffInMs = dueDate - Date.now()
        // Tempo correspondente a um dia em ms
        const dayInMs = 24 * 60 * 60 * 1000
        // Dias restantes para entrega do projeto
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs)
        // Confere se o prazo de entrega já passou, se sim, formata-o
        return dayDiff >= 0 ? dayDiff : 0
    },

    calculateBudget (job, valueHour) {
        return budget = Number(valueHour)*Number(job["total-hours"])
    }
}