import { NativeModules } from 'react-native';

type ReactNativeAnimatableHeaderType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ReactNativeAnimatableHeader } = NativeModules;

export default ReactNativeAnimatableHeader as ReactNativeAnimatableHeaderType;
