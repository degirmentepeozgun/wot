using Core.EntityTemplates.Attribute;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Core.EntityTemplates.Concrete {
	public class Entity {
        public Entity() {
		}
		[Range(0, short.MaxValue)]
        public virtual short? Flags {
            get; set;
        }
        public bool IsLocked {
            get => this.Flags != null && (this.Flags & 64) > 0;
        }
        public bool IsHidden {
            get => this.Flags != null && (this.Flags & 128) > 0;
        }
        [Sortable]
        [IgnoreHistory]
        [IgnoreEquality]
        public DateTime? CreateDateTime {
            get; set;
        }

        [Sortable(Default = true)]
        [IgnoreHistory]
        [IgnoreEquality]
        public DateTime? LastUpdateTime {
            get; set;
        }
        [IgnoreHistory]
        [IgnoreEquality]
		[JsonIgnore]
        public bool? Updated {
			get; set;
		}
        [IgnoreHistory]
        [IgnoreEquality]
		[JsonIgnore]
        public string? Error {
            get; set;
        }
        [JsonIgnore]
        [IgnoreEquality]
		[IgnoreHistory]
		public bool ForceUpdate { get; set; }
    }
}
