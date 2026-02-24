namespace Web.BackEnd.Api {
    public class CacheOption {
        public string? Key {
            get; set;
        }
        public double TimeSpan {
            get; set;
        }
    }

    public class HttpResult<T> {
        public int StatusCode {
            get; set;
        }
        public string? Message {
            get; set;
        }
        public string? Description {
            get; set;
        }
        public bool IsSuccess {
            get => StatusCode <= 204 || (StatusCode < 400);
        }
        public int? TotalRecords {
            get; set;
        }
        public int? TotalPages {
            get; set;
        }
        public T? Data {
            get; set;
        }
        public double Interval {
            get => (DateTime.UtcNow - Settings.FirstDateTime).TotalMilliseconds;
        }
        public float Version {
            get => Settings.Version;
        }
        public CacheOption? CacheOptions {
            get; set;
        }
    }
}
