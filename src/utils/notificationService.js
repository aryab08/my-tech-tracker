// Utility for browser native Push Notifications & Scheduled Alarms (Bulletproof error-wrapped)

export function requestNotificationPermission() {
  return new Promise((resolve) => {
    try {
      if (typeof window === 'undefined' || !('Notification' in window)) {
        resolve('unsupported');
        return;
      }
      // Handle both Promise-based and Callback-based Notification.requestPermission
      const req = Notification.requestPermission((permission) => {
        if (permission) resolve(permission);
      });
      if (req && typeof req.then === 'function') {
        req.then(resolve).catch(() => resolve('unsupported'));
      }
    } catch (e) {
      console.warn('Notification permission error:', e);
      resolve('unsupported');
    }
  });
}

export function checkNotificationPermission() {
  try {
    if (typeof window === 'undefined' || !('Notification' in window)) return 'unsupported';
    return Notification.permission || 'unsupported';
  } catch (e) {
    return 'unsupported';
  }
}

export function sendNativeNotification(title, body) {
  try {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      const notif = new Notification(title, {
        body,
        icon: './favicon.svg',
        badge: './favicon.svg',
        vibrate: [200, 100, 200]
      });

      playNotificationSound();

      notif.onclick = () => {
        try {
          window.focus();
        } catch (e) {}
      };
    }
  } catch (e) {
    console.warn('Failed to trigger notification:', e);
  }
}

function playNotificationSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // Audio context restricted until user gesture
  }
}
