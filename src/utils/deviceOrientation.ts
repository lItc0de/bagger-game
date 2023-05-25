interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export const initDeviceOrientation = async (): Promise<boolean> => {
  const requestPermission = (
    DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
  ).requestPermission;
  const iOS = typeof requestPermission === 'function';

  if (!iOS) return true;

  const res = await requestPermission();
  return res === 'granted';
};

// export const initDeviceOrientation = async (): Promise<boolean> =>
//   await new Promise<boolean>((resolve, reject) => {
//     const requestPermission = (
//       DeviceOrientationEvent as unknown as DeviceOrientationEventiOS
//     ).requestPermission;
//     const iOS = typeof requestPermission === 'function';

//     if (!iOS) {
//       resolve(true);
//       return;
//     }

//     requestPermission()
//       .then(res => {
//         console.log('hello', res);

//         if (res === 'granted') resolve(true);
//         else reject(new Error('Device orientation permission problem'));
//       })
//       .catch((e) => {
//         console.log('nooo');
//         console.error(e);

//         reject(new Error('Device orientation permission problem'));
//       });
//   });
