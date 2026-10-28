using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Text.Json.Serialization;

namespace Web.BackEnd.Api.Helper {
	public class OnlineUser {
		public string SocketId {
			get; set;
		}
		public string Name {
			get; set;
		}
        public DateTime? ConnectedAt { get; set; }
		public long OnlineDuration => ConnectedAt.HasValue ?
	   (long)(DateTime.UtcNow - ConnectedAt.Value).TotalMilliseconds : 0;
		public bool? IsBusy { get; set; }

    }
	public class ChatMessage {
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? N {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? M {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? S {
			get; set;
		}
	}
	public class Buff {
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? L {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? K {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public long? S {
			get; set;
		}
	}
	public class ChargeProperties {
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? D {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? S {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? E {
			get; set;
		}
	}

	public class TransferObject {
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public List<Buff>? B {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public ChargeProperties? Q {//
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? C {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? S {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? A {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? N {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? Cl {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public short? G {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public int? H {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public int? K {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public int? E {//Episode
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public int? Mh {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? D {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? Rc {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? X {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? U {//Keyboard
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? L {//Level
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? J { //ExtraStepXRate
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? V {//ExtraStepYRate
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? P {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public byte? Am {//AutoMode
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? Y {//YPosition
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public int? F {//Fatique
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public int? Mf {//MaxFatique
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public float? Z {
			get; set;
		}
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? T {
			get; set;
		}
	}

	// Yeni RoomInfo sınıfı
	public class RoomInfo {
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
		public HashSet<string> Members { get; set; } = new();
	}

	public class GameHub : Hub {
		const string _receive = "R";
		protected IHubContext<GameHub> _context;
		private static readonly Dictionary<string, OnlineUser> ConnectedUsers = new();

		public GameHub(IHubContext<GameHub> context) {
			this._context = context;
		}

		public void Send(TransferObject command) {
			Task.Run(async () => {
				await S(command);
			});
		}

		public async Task S(TransferObject command) {
			if(!string.IsNullOrEmpty(command.T)) {
				var targetConn = ConnectedUsers
					.FirstOrDefault(x => x.Value.SocketId == command.T).Key;
				if(!string.IsNullOrEmpty(targetConn))
					await Clients.Client(targetConn).SendAsync(_receive, command);
			}	
			else
				await this._context.Clients.All.SendAsync(_receive, command);
		}

		public async Task T(string roomId, List<TransferObject> command) {
			await SendToRoom(roomId, command);
		}
		public async Task M(ChatMessage command) {
			await Clients.Others.SendAsync("M", command);
		}

		public async override Task OnConnectedAsync() {
			var httpContext = Context.GetHttpContext();
			if(httpContext != null) {
				var name = httpContext.Request.Query["n"].ToString();
				var socket = httpContext.Request.Query["s"].ToString();
				var busy = httpContext.Request.Query["b"].ToString();
				var userId = string.IsNullOrEmpty(socket) ?
					Guid.NewGuid().ToString("N").Substring(0, 4) : socket;
				var user = new OnlineUser {
					SocketId = userId,
					Name = name,
					ConnectedAt = DateTime.UtcNow,
					IsBusy = !string.IsNullOrEmpty(busy) ? true : false 
				};
				ConnectedUsers[Context.ConnectionId] = user;
				await Clients.Caller.SendAsync("AssignId", userId);
			}
			await base.OnConnectedAsync();
		}

		// RoomId -> RoomInfo
		private static readonly ConcurrentDictionary<string, RoomInfo> _rooms
			= new();

		// Room oluştur
		public async Task CreateRoom(string roomId) {
			// 1. Aynı ID varsa sil
			if(_rooms.TryRemove(roomId, out var oldRoom)) {
				foreach(var connId in oldRoom.Members) {
					await Groups.RemoveFromGroupAsync(connId, roomId);
				}
			}

			// 2. 10 dakikadan eski tüm odaları sil
			var expired = _rooms
				.Where(kvp => (DateTime.UtcNow - kvp.Value.CreatedAt).TotalMinutes > 10)
				.Select(kvp => kvp.Key)
				.ToList();

			foreach(var expId in expired) {
				if(_rooms.TryRemove(expId, out var expRoom)) {
					foreach(var connId in expRoom.Members) {
						await Groups.RemoveFromGroupAsync(connId, expId);
					}
				}
			}

			// 3. Yeni oda ekle
			var newRoom = new RoomInfo {
				CreatedAt = DateTime.UtcNow
			};
			_rooms[roomId] = newRoom;

			// kuran kişi otomatik girsin
			await JoinRoom(roomId);
		}

		// Odaya katıl
		public async Task JoinRoom(string roomId) {
			var connectionId = Context.ConnectionId;

			var room = _rooms.GetOrAdd(roomId, _ => new RoomInfo());
			lock(room.Members)
				room.Members.Add(connectionId);

			await Groups.AddToGroupAsync(connectionId, roomId);
			await Clients.Group(roomId).SendAsync("SystemMessage", $"{connectionId} joined {roomId}");
		}

		// Odadan ayrıl
		public async Task LeaveRoom(string roomId) {
			var connectionId = Context.ConnectionId;

			if(_rooms.TryGetValue(roomId, out var room)) {
				lock(room.Members)
					room.Members.Remove(connectionId);

				await Groups.RemoveFromGroupAsync(connectionId, roomId);

				// Eğer oda boşsa tamamen sil
				if(room.Members.Count == 0)
					_rooms.TryRemove(roomId, out _);

				await Clients.Group(roomId).SendAsync("SystemMessage", $"{connectionId} left {roomId}");
			}
		}

		// Disconnect olduğunda otomatik leave
		public override async Task OnDisconnectedAsync(Exception? exception) {
			foreach(var kvp in _rooms) {
				var roomId = kvp.Key;
				var room = kvp.Value;

				if(room.Members.Contains(Context.ConnectionId))
					await LeaveRoom(roomId);
			}
			ConnectedUsers.Remove(Context.ConnectionId);
			await base.OnDisconnectedAsync(exception);
		}

		// Mesajı sadece odaya gönder (gönderen hariç)
		public async Task SendToRoom(string roomId, List<TransferObject> message) {
			await Clients.OthersInGroup(roomId).SendAsync("T", message);
		}
		public async Task SetBusyState(bool state) {
			ConnectedUsers[Context.ConnectionId].IsBusy = state;
		}

		public Task<List<OnlineUser>> GetOnlineUsers() {
			return Task.FromResult(ConnectedUsers.Values
				.OrderByDescending(x => x.ConnectedAt ?? DateTime.MinValue)
				.Take(100)
				.ToList());
		}
	}
}
