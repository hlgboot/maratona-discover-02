const Database = require("../database/config")

module.exports = {
    async get () {
        const db = await Database()
        
        const jobs = await db.all(`SELECT * FROM jobs`)
        
        await db.close()
        
        return jobs.map(job => (
            {
                ...job,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
            }
        ))
    },
    async create (newJob) {
        const db = await Database()

        db.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )`)

        await db.close()
        
    },
    async update (updatedJob, id) {
        const db = await Database()

        db.run(`UPDATE jobs SET 
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${id}
        `)

        await db.close()
    },
    async delete (id) {
        const db = await Database()

        db.run(`DELETE FROM jobs WHERE id = ${id}`)

        await db.close()
    },    
}