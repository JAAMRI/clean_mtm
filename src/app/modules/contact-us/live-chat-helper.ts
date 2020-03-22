export function embedChatWidget() {
    const widgetScript = document.createElement('script');

    widgetScript.innerHTML = ` if (!window._laq) { window._laq = []; }
    window._laq.push(function () {
      liveagent.showWhenOnline('5734J0000000EkV', document.getElementById('liveagent_button_online_5734J0000000EkV'));
      liveagent.showWhenOffline('5734J0000000EkV', document.getElementById('liveagent_button_offline_5734J0000000EkV'));
    });`;
    document.body.appendChild(widgetScript);

    const liveAgentScript = document.createElement('script')
    liveAgentScript.innerHTML = ` liveagent.init('https://d.la1-c2-lo2.salesforceliveagent.com/chat', '5720L0000008dXQ', '00DE0000000bbLj');`
    document.body.appendChild(liveAgentScript)

}