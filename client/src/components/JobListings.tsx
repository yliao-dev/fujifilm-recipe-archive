import React from 'react'
import jobs from '../jobs.json'
import JobListing from './JobListing'


// export type Item = {
//   _id: Number;
//   status: Boolean;
//   body: json;
// }

const JobListings = ({isHome = false}) => {
    const JobListings = isHome ? jobs.slice(0, 3) : jobs;
  // Fetch Items
//   const {data:items, isLoading} = useQuery<Item[]>({
//     queryKey:["todos"],
//     queryFn: async() => {
//         try {
//           const res = await fetch(BASE_URL + "/todos")
//           const data = await res.json()
//           if(!res.ok) {
//             throw new Error(data.error || "something wrong")
//           }
//           return data || []
//         } catch (error) {

//         }
        
//     }
// })
  return (
    <>
    {/* <!-- Browse Jobs --> */}
    <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : 'Browse Jobs'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JobListings.map((job) => (
            <JobListing key={job.id} job={job}/>
            ))}
            </div>
          </div>
      </section>
      </>
  )
}

export default JobListings