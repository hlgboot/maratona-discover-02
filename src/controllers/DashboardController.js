const Utils = require("../utils/JobUtils")
const Job = require("../model/Job")
const Profile = require("../model/Profile")


module.exports = {
    async index (req, res) {
        
        const profile = await Profile.get()

        const jobs = await Job.get()

        let freeHours = profile["hours-per-day"]

        const statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        const formatedJobs = jobs.map(job => {

            const remainingDays = Utils.getRemainingDays(job)
            const status = remainingDays <= 0 ? "done" : "progress"

            statusCount[status] += 1

            freeHours = status === "progress" ? freeHours -= job["daily-hours"] : freeHours

            const budget = Utils.calculateBudget(job,  profile["value-hour"])
            
            return {
                ...job,
                remainingDays,
                status,
                budget
            }
        })
        return res.render("index.ejs", {
            jobs: formatedJobs,
            profile,
            statusCount,
            freeHours
        })
    }
}
