using Core.Logging;
using Microsoft.AspNetCore.SignalR.Client;

namespace Web.BackEnd.Business.Manager {
	public class SignalRManager {
		HubConnection? connectionSignalR;
		const string _send = "SendMessage";
		public SignalRManager() {
			Connect().Wait();
		}
		async Task Connect() {
			string url = string.Empty;
#if DEBUG
			url = "https://localhost:7082/comhub";
#else
			url = "wss://adminapi.kitap12.com/comhub";
#endif
			try {
				connectionSignalR = new HubConnectionBuilder().WithUrl(url)
					.WithAutomaticReconnect().Build();
				await connectionSignalR.StartAsync();
			}
			catch(Exception ex) {
				LogKeeper.LogError(ex.Message);
			}
		}
		public async Task InvokeSignal(string groupId, string command, object task) {
			bool reconnect = false;
		retry:
			try {
				if(!reconnect)
					await connectionSignalR?.InvokeAsync(_send, groupId, command, task);
			}
			catch {
				try {
					Connect().Wait();
					reconnect = true;
					goto retry;
				}
				catch { }
			}
		}
	}
}
