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
		public DateTime LastPacket { get; set; } = DateTime.UtcNow;
		public HashSet<string> Members { get; set; } = new();
	}

	public class DuelSeat {
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? S { get; set; }
		[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
		public string? Id { get; set; }
		public string? N { get; set; }
		public string? C { get; set; }
		public int P { get; set; }
		public byte T { get; set; }
		public byte R { get; set; }
		public byte L { get; set; }
		public byte I { get; set; }
	}

	public class DuelRoomView {
		public string? S { get; set; }
		public string? N { get; set; }
		public byte T { get; set; }
		public List<DuelSeat> P { get; set; } = new();
	}

	class DuelRoomState {
		public string Id = "";
		public string Name = "";
		public byte Private;
		public string? Password;
		public bool Started;
		public bool MatchEnded;
		public DateTime CreatedAt = DateTime.UtcNow;
		public DateTime LastPacket = DateTime.UtcNow;
		public List<DuelSeat> Players = new();
		public HashSet<string> Connections = new();
		public object Sync = new();
	}

	public class GameHub : Hub {
		const string _receive = "R";
		protected IHubContext<GameHub> _context;
		private static readonly Dictionary<string, OnlineUser> ConnectedUsers = new();
		static IHubContext<GameHub>? _hub;
		static int _sweepStarted;

		public GameHub(IHubContext<GameHub> context) {
			this._context = context;
			_hub = context;
			if(Interlocked.Exchange(ref _sweepStarted, 1) == 0)
				_ = SweepIdleLoop();
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
		public async Task DuelChat(string text) {
			if(string.IsNullOrWhiteSpace(text))
				return;
			text = text.Trim();
			if(text.Length > 200)
				text = text.Substring(0, 200);
			if(!ConnectedUsers.TryGetValue(Context.ConnectionId, out var me))
				return;
			var room = FindDuel(Context.ConnectionId);
			if(room == null)
				return;
			await Clients.OthersInGroup(DuelGroup(room.Id)).SendAsync("Duel", "chat", new ChatMessage {
				N = me.Name,
				M = text,
				S = me.SocketId
			});
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
		private static readonly ConcurrentDictionary<string, DuelRoomState> _duels
			= new();

		// Room oluştur
		public async Task CreateRoom(string roomId) {
			// 1. Aynı ID varsa sil
			if(_rooms.TryRemove(roomId, out var oldRoom)) {
				foreach(var connId in oldRoom.Members) {
					await Groups.RemoveFromGroupAsync(connId, roomId);
				}
			}

			// Yeni oda ekle
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
			await LeaveDuel(Context.ConnectionId);
			ConnectedUsers.Remove(Context.ConnectionId);
			await base.OnDisconnectedAsync(exception);
		}

		// Mesajı sadece odaya gönder (gönderen hariç)
		public async Task SendToRoom(string roomId, List<TransferObject> message) {
			TouchRoom(roomId);
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

		static string DuelGroup(string roomId) => "duel:" + roomId;

		static void TouchRoom(string roomId) {
			var now = DateTime.UtcNow;
			var id = roomId.StartsWith("duel:") ? roomId.Substring(5) : roomId;
			if(_duels.TryGetValue(id, out var duel))
				duel.LastPacket = now;
			if(_rooms.TryGetValue(roomId, out var room))
				room.LastPacket = now;
		}

		static async Task SweepIdleLoop() {
			while(true) {
				try {
					await Task.Delay(TimeSpan.FromMinutes(1));
					await SweepIdle();
				}
				catch { }
			}
		}

		static async Task SweepIdle() {
			var hub = _hub;
			if(hub == null)
				return;
			var now = DateTime.UtcNow;
			foreach(var room in _duels.Values.Where(x => x.Started && (now - x.LastPacket).TotalMinutes >= 10).ToList())
				await CloseDuelCore(hub, room);
			foreach(var kvp in _rooms.Where(x => (now - x.Value.LastPacket).TotalMinutes >= 10).ToList())
				await CloseFightCore(hub, kvp.Key, kvp.Value);
		}

		static async Task CloseFightCore(IHubContext<GameHub> hub, string roomId, RoomInfo room) {
			if(!_rooms.TryRemove(roomId, out _))
				return;
			foreach(var conn in room.Members.ToArray())
				await hub.Groups.RemoveFromGroupAsync(conn, roomId);
		}

		static string Clip(string? value, int max) {
			value = (value ?? "").Trim();
			return value.Length <= max ? value : value.Substring(0, max);
		}

		OnlineUser Me() {
			if(!ConnectedUsers.TryGetValue(Context.ConnectionId, out var user) || string.IsNullOrEmpty(user.SocketId))
				throw new HubException("missing");
			return user;
		}

		DuelRoomState? FindDuel(string connectionId) {
			foreach(var room in _duels.Values)
				if(room.Connections.Contains(connectionId))
					return room;
			return null;
		}

		DuelRoomState RoomOrThrow(string roomId) {
			if(!_duels.TryGetValue(roomId, out var room))
				throw new HubException("Room not found");
			return room;
		}

		void RequireLeader(DuelRoomState room, OnlineUser me) {
			if(room.Id != me.SocketId)
				throw new HubException("Only the leader can do this");
		}

		static string SeatKey(DuelSeat seat) => seat.S ?? seat.Id ?? "";

		static void NormalizeSlots(List<DuelSeat> players) {
			foreach(var team in new byte[] { 1, 2 }) {
				var seats = players.Where(x => x.T == team).ToList();
				var used = new bool[3];
				foreach(var seat in seats) {
					if(seat.I < 3 && !used[seat.I])
						used[seat.I] = true;
					else
						seat.I = 255;
				}
				foreach(var seat in seats) {
					if(seat.I != 255)
						continue;
					for(byte i = 0; i < 3; i++) {
						if(used[i])
							continue;
						seat.I = i;
						used[i] = true;
						break;
					}
				}
			}
		}

		static byte FreeSlot(List<DuelSeat> players, byte team) {
			var used = new bool[3];
			foreach(var seat in players)
				if(seat.T == team && seat.I < 3)
					used[seat.I] = true;
			for(byte i = 0; i < 3; i++)
				if(!used[i])
					return i;
			return 0;
		}

		DuelRoomView View(DuelRoomState room) {
			lock(room.Sync) {
				NormalizeSlots(room.Players);
				return new DuelRoomView {
					S = room.Id,
					N = room.Name,
					T = room.Private,
					P = room.Players.Select(x => new DuelSeat {
						S = x.S,
						Id = x.Id,
						N = x.N,
						C = x.C,
						P = x.P,
						T = x.T,
						R = x.R,
						L = x.L,
						I = x.I
					}).ToList()
				};
			}
		}

		async Task PushRoom(DuelRoomState room) {
			await Clients.Group(DuelGroup(room.Id)).SendAsync("Duel", "room", View(room));
		}

		async Task PushChanged() {
			await Clients.All.SendAsync("Duel", "changed");
		}

		async Task CloseDuel(DuelRoomState room) {
			await CloseDuelCore(_hub ?? _context, room);
		}

		static async Task CloseDuelCore(IHubContext<GameHub> hub, DuelRoomState room) {
			if(!_duels.TryRemove(room.Id, out var current))
				return;
			var group = DuelGroup(current.Id);
			await hub.Clients.Group(group).SendAsync("Duel", "closed", current.Id);
			foreach(var conn in current.Connections.ToArray())
				await hub.Groups.RemoveFromGroupAsync(conn, group);
			await hub.Clients.All.SendAsync("Duel", "changed");
		}

		async Task LeaveDuel(string connectionId) {
			var room = FindDuel(connectionId);
			if(room == null)
				return;
			if(!ConnectedUsers.TryGetValue(connectionId, out var user))
				return;
			if(room.Id == user.SocketId && !room.MatchEnded) {
				await CloseDuel(room);
				return;
			}
			lock(room.Sync) {
				room.Connections.Remove(connectionId);
				room.Players.RemoveAll(x => x.S == user.SocketId);
			}
			await Groups.RemoveFromGroupAsync(connectionId, DuelGroup(room.Id));
			if(room.MatchEnded) {
				if(room.Connections.Count == 0)
					await CloseDuel(room);
				return;
			}
			await PushRoom(room);
			await PushChanged();
		}

		public Task<List<DuelRoomView>> DuelRooms() {
			var list = _duels.Values
				.Where(x => !x.Started)
				.OrderByDescending(x => x.CreatedAt)
				.Select(View)
				.ToList();
			return Task.FromResult(list);
		}

		public async Task<DuelRoomView> DuelCreate(string name, string? password, string className, int power) {
			var me = Me();
			name = Clip(name, 20);
			if(name.Length == 0)
				throw new HubException("Name is required");
			password = Clip(password, 20);
			var current = FindDuel(Context.ConnectionId);
			if(current != null)
				await LeaveDuel(Context.ConnectionId);
			if(_duels.TryGetValue(me.SocketId, out var led))
				await CloseDuel(led);
			var room = new DuelRoomState {
				Id = me.SocketId,
				Name = name,
				Private = string.IsNullOrEmpty(password) ? (byte)0 : (byte)1,
				Password = string.IsNullOrEmpty(password) ? null : password,
				CreatedAt = DateTime.UtcNow
			};
			room.Players.Add(new DuelSeat {
				S = me.SocketId,
				N = me.Name,
				C = Clip(className, 16),
				P = power,
				T = 1,
				R = 0,
				L = 1,
				I = 0
			});
			room.Connections.Add(Context.ConnectionId);
			_duels[room.Id] = room;
			await Groups.AddToGroupAsync(Context.ConnectionId, DuelGroup(room.Id));
			await PushRoom(room);
			await PushChanged();
			return View(room);
		}

		public async Task<DuelRoomView> DuelJoin(string roomId, string? password, string className, int power) {
			var me = Me();
			var room = RoomOrThrow(roomId);
			if(room.Started)
				throw new HubException("Duel already started");
			var already = false;
			lock(room.Sync) {
				if(room.Players.Any(x => x.S == me.SocketId)) {
					room.Connections.Add(Context.ConnectionId);
					already = true;
				}
			}
			if(already) {
				await Groups.AddToGroupAsync(Context.ConnectionId, DuelGroup(room.Id));
				return View(room);
			}
			if(room.Private == 1 && (room.Password ?? "") != Clip(password, 20))
				throw new HubException("Wrong Password");
			var current = FindDuel(Context.ConnectionId);
			if(current != null && current.Id != room.Id)
				await LeaveDuel(Context.ConnectionId);
			lock(room.Sync) {
				if(room.Players.Count >= 6)
					throw new HubException("Room is full");
				NormalizeSlots(room.Players);
				var blue = room.Players.Count(x => x.T == 1);
				var red = room.Players.Count(x => x.T == 2);
				if(blue >= 3 && red >= 3)
					throw new HubException("Room is full");
				var team = (byte)(blue <= red ? 1 : 2);
				room.Players.Add(new DuelSeat {
					S = me.SocketId,
					N = me.Name,
					C = Clip(className, 16),
					P = power,
					T = team,
					R = 0,
					L = 0,
					I = FreeSlot(room.Players, team)
				});
				room.Connections.Add(Context.ConnectionId);
			}
			await Groups.AddToGroupAsync(Context.ConnectionId, DuelGroup(room.Id));
			await PushRoom(room);
			await PushChanged();
			return View(room);
		}

		public async Task DuelLeave() {
			await LeaveDuel(Context.ConnectionId);
		}

		public async Task DuelKick(string key) {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			RequireLeader(room, me);
			if(key == me.SocketId) {
				await CloseDuel(room);
				return;
			}
			string? kickedConn = null;
			lock(room.Sync) {
				var seat = room.Players.FirstOrDefault(x => SeatKey(x) == key);
				if(seat == null)
					throw new HubException("missing");
				room.Players.Remove(seat);
				if(!string.IsNullOrEmpty(seat.S)) {
					kickedConn = ConnectedUsers.FirstOrDefault(x => x.Value.SocketId == seat.S).Key;
					if(!string.IsNullOrEmpty(kickedConn))
						room.Connections.Remove(kickedConn);
				}
			}
			if(!string.IsNullOrEmpty(kickedConn)) {
				await Clients.Client(kickedConn).SendAsync("Duel", "kicked", room.Id);
				await Groups.RemoveFromGroupAsync(kickedConn, DuelGroup(room.Id));
			}
			await PushRoom(room);
			await PushChanged();
		}

		public async Task DuelReady() {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			lock(room.Sync) {
				var seat = room.Players.FirstOrDefault(x => x.S == me.SocketId);
				if(seat == null)
					throw new HubException("missing");
				seat.R = seat.R == 1 ? (byte)0 : (byte)1;
			}
			await PushRoom(room);
		}

		public async Task DuelUnready() {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			var changed = false;
			lock(room.Sync) {
				if(room.Started)
					return;
				var seat = room.Players.FirstOrDefault(x => x.S == me.SocketId);
				if(seat == null)
					throw new HubException("missing");
				if(seat.R != 0) {
					seat.R = 0;
					changed = true;
				}
			}
			if(changed)
				await PushRoom(room);
		}

		public async Task DuelSwap(string key, byte direction) {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			RequireLeader(room, me);
			lock(room.Sync) {
				NormalizeSlots(room.Players);
				var player = room.Players.FirstOrDefault(x => SeatKey(x) == key);
				if(player == null)
					throw new HubException("missing");
				var team = player.T;
				var slot = (int)player.I;
				if(direction == 1) {
					if(slot > 0)
						slot--;
					else if(team == 2) {
						team = 1;
						slot = 2;
					}
					else
						return;
				}
				else if(direction == 2) {
					if(slot < 2)
						slot++;
					else if(team == 1) {
						team = 2;
						slot = 0;
					}
					else
						return;
				}
				else
					return;
				var oldTeam = player.T;
				var oldSlot = player.I;
				var other = room.Players.FirstOrDefault(x => x.T == team && x.I == slot);
				if(other != null) {
					other.T = oldTeam;
					other.I = oldSlot;
				}
				player.T = team;
				player.I = (byte)slot;
			}
			await PushRoom(room);
		}

		public async Task DuelBot(string id, string name, string className, int power, byte team, int index = -1, int slot = -1) {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			RequireLeader(room, me);
			id = Clip(id, 8);
			name = Clip(name, 20);
			className = Clip(className, 16);
			if(id.Length == 0 || name.Length == 0 || className.Length == 0)
				throw new HubException("missing");
			if(team != 1 && team != 2)
				throw new HubException("missing");
			var added = false;
			lock(room.Sync) {
				NormalizeSlots(room.Players);
				if(index >= 0) {
					if(index >= room.Players.Count)
						throw new HubException("missing");
					var current = room.Players[index];
					if(!string.IsNullOrEmpty(current.S))
						throw new HubException("missing");
					if(room.Players.Any(x => x.Id == id && !ReferenceEquals(x, current)))
						throw new HubException("missing");
					var teamCount = room.Players.Count(x => x.T == team && !ReferenceEquals(x, current));
					if(teamCount >= 3)
						throw new HubException("Room is full");
					room.Players[index] = new DuelSeat {
						Id = id,
						N = name,
						C = className,
						P = power,
						T = team,
						R = 1,
						I = current.I
					};
				}
				else {
					if(room.Players.Count >= 6 || room.Players.Count(x => x.T == team) >= 3)
						throw new HubException("Room is full");
					if(room.Players.Any(x => x.Id == id))
						throw new HubException("missing");
					var place = slot >= 0 && slot <= 2 && !room.Players.Any(x => x.T == team && x.I == slot)
						? (byte)slot
						: FreeSlot(room.Players, team);
					room.Players.Add(new DuelSeat {
						Id = id,
						N = name,
						C = className,
						P = power,
						T = team,
						R = 1,
						I = place
					});
					added = true;
				}
			}
			await PushRoom(room);
			if(added)
				await PushChanged();
		}

		public async Task DuelClass(string className, int power) {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			className = Clip(className, 16);
			if(className != "warrior" && className != "archer" && className != "thief" && className != "cyclops" && className != "werewolf")
				throw new HubException("missing");
			lock(room.Sync) {
				if(room.Started)
					throw new HubException("Duel already started");
				var seat = room.Players.FirstOrDefault(x => x.S == me.SocketId) ?? throw new HubException("missing");
				seat.C = className;
				seat.P = power < 0 ? 0 : power;
			}
			await PushRoom(room);
		}

		public async Task DuelStart() {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			RequireLeader(room, me);
			lock(room.Sync) {
				if(room.Started)
					throw new HubException("Duel already started");
				if(!room.Players.Any(x => x.T == 1) || !room.Players.Any(x => x.T == 2))
					throw new HubException("Not ready");
				if(room.Players.Any(x => !string.IsNullOrEmpty(x.S) && x.R != 1))
					throw new HubException("Not ready");
				room.Started = true;
				room.LastPacket = DateTime.UtcNow;
			}
			await Clients.Group(DuelGroup(room.Id)).SendAsync("Duel", "start", View(room));
			await PushChanged();
		}

		public async Task DuelMatchEnd() {
			var me = Me();
			var room = FindDuel(Context.ConnectionId);
			if(room == null || room.Id != me.SocketId || !room.Started)
				return;
			room.MatchEnded = true;
		}

		public async Task DuelEnd() {
			var me = Me();
			var room = FindDuel(Context.ConnectionId) ?? throw new HubException("Room not found");
			RequireLeader(room, me);
			if(!room.Started)
				return;
			await CloseDuel(room);
		}
	}
}
