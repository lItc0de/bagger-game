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
