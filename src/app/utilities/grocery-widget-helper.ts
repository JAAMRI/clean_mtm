export function embedWidget() {
  const widgetScript = document.createElement('script');
  widgetScript.innerHTML = `(function(a,b,c,d,e,f,g){a[d]=a[d]||function(){(a[d].q=a[d].q||[])
    .push(arguments)};f=b.createElement(c);f.src=e+'?'+(Date.now()/3.6e+6)
    .toFixed();g=b.querySelector(c);g.parentNode.insertBefore(f,g)})
    (window,document,'script','constantco','https://cdn.constant.co/app/mealsthatmatterca/cc.js');`;
  document.head.appendChild(widgetScript);
}

export function openWidget() {
  const widget = document.getElementsByClassName('cc-side-drawer-anchor')[0] as any;
  widget.click();
}

export function showWidget() {
  const widget = document.getElementsByClassName('cc-side-drawer-anchor')[0] as any;
  widget.style.cssText = 'display:unset !important';
}

export function hideWidget() {
  const widget = document.getElementsByClassName('cc-side-drawer-anchor')[0] as any;
  widget.style.cssText = 'display:none !important';
}