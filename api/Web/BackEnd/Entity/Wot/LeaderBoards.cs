using Core.EntityTemplates.Attribute;
using Core.EntityTemplates.Concrete;

namespace Web.BackEnd.Entity.Wot {
	public class LeaderBoards : EntityBase<string?> {
		[UniqueColumn(Key = "a")]
		public string MissionKey { get; set;
		}
		[UniqueColumn(Key = "a")]
		public string DeviceId {
			get; set;
		}
		public int Point { get; set;
		}
		public string Name {
			get; set;
		}
		[IgnoreEquality]
		[IgnoreHistory]
		public bool IsNewRecord { get; private set; }
		public void SetNewRecord(bool _newRecord) {
			IsNewRecord = _newRecord;
		}
    }
}
