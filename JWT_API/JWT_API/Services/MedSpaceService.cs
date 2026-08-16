using JWT_API.Interfaces;
using JWT_API.MedSpaceDBContext;
using JWT_API.Models;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace JWT_API.Services
{
    public class MedSpaceService : IMedSpaceService
    {
        private readonly MedSpaceReportContext MSdbContext;

        public MedSpaceService(MedSpaceReportContext dBContext)
        {
            MSdbContext = dBContext;
        }

        public async Task<Response> GetUsersList()
        {
            Response res = new Response();

            try
            {
                var data = await MSdbContext.UserDetails.ToListAsync();
                if (data.Count > 0)
                {
                    res.StatusCode = 1;
                    res.Data = data;
                    res.Message = "List Generated Successfully";
                }
                else
                {
                    res.StatusCode = 0;
                    res.Data = "";
                    res.Message = "List Not Generated Successfully";
                }


            }
            catch (Exception ex)
            {
                res.StatusCode = 0;
                res.Message = "Exception Occured Message : " + ex;
            }

            return await Task.FromResult<Response>(res);
        }

        public async Task<Response> GetUserBloodSugarReadings(ReqUsername req)
        {
            Response res = new Response();
            try
            {
                var data = await MSdbContext.BloodSugarReports.Where(x => x.UserName == req.username)
                .OrderBy(x => x.RpDate)
                .Select(x => new {
                    x.BsLvl,
                    x.RpDate
                }).ToListAsync();
                if (data.Count > 0)
                {
                    res.StatusCode = 1;
                    res.Data = data;
                    res.Message = "List Generated Successfully";
                }
                else
                {
                    res.StatusCode = 0;
                    res.Data = "";
                    res.Message = "List Not Generated Successfully";
                }

            }
            catch (Exception ex)
            {
                res.StatusCode = 0;
                res.Message = "Exception Occured Message : " + ex;
            }


            return await Task.FromResult<Response>(res);
            
        }
    }
}
