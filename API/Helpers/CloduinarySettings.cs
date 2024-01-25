namespace API.Helpers
{
    public class CloduinarySettings
    {
        public string CloudName { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecret { get; set; }

        public CloduinarySettings()
        {
            CloudName = Environment.GetEnvironmentVariable("CLOUDINARY_NAME");
            ApiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            ApiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");
        }
    }
}