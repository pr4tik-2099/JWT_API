using JWT_API.Models;

namespace JWT_API.Interfaces
{
    public interface IMedSpaceService
    {
        Task<Response> GetUsersList();
        Task<Response> GetUserBloodSugarReadings(ReqUsername req);
    }
}
