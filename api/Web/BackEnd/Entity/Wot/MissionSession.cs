using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Wot {
	public class MissionSession : EntityBase<string?> {
		[UniqueColumn(Key = "a")]
        public string MissionKey { get; set;
		}
		[UniqueColumn(Key = "a")]
		public string DeviceId {
			get; set;
		}
		public string? SecretKey {
			get; set;
		}
        public string? SessionGuid { get; set; }
    }
}
