const Utils = require("../utils/JobUtils")
const Job = require("../model/Job")
const Profile = require("../model/Profile")

// Controladores das rotas dos Jobs

module.exports = {

    form (req, res) {
        return res.render("job.ejs")
    },

    async create (req, res) {
        const newJob = req.body
    
        await Job.create({
            name: newJob.name,
            "daily-hours": Number(newJob["daily-hours"]),
            "total-hours": Number(newJob["total-hours"]),
            created_at: Date.now()
        })
        return res.redirect("/")
    },

    async read (req, res) {

        const {id} = req.params

        const jobs = await Job.get()

        const profile = await Profile.get()
        
        const job = await jobs.find(e => e.id === Number(id))
        
        if(!job){
            return res.send("Job not found.").status(404)
        }

        job.budget = Utils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit.ejs", { job })
    },

    async update (req, res) {
        
        const data = req.body
        const {id} = req.params

        const updatedJob = {
            name: data.name,
            "total-hours": data["total-hours"],
            "daily-hours": data["daily-hours"],
        }

        await Job.update(updatedJob, id)

        return res.redirect("/job/" + id)
    },

    async delete (req, res) {
        const {id} = req.params

        await Job.delete(id)

        return res.redirect("/")
    }
}