import { Dimensions, StatusBar, Platform, Easing, UIManager, LayoutAnimation, LayoutAnimationConfig } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
export let { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');
export const IOS = Platform.OS === 'ios';
export const ANDROID = Platform.OS === 'android';

export const FADE = {
    from: {
        opacity: 0,
        scale: 1,
    },
    to: {
        opacity: 1,
        scale: 1,
    },
};

export const layoutAnimation = () => {
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    LayoutAnimation.configureNext(LayoutAnimation?.Presets?.easeInEaseOut)
}

export const springLayoutAnimation = () => {
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    LayoutAnimation.configureNext(LayoutAnimation?.Presets?.spring)
}

export const linearLayoutAnimation = (customAnim?: LayoutAnimationConfig) => {
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    if (customAnim) return LayoutAnimation.configureNext(customAnim);
    LayoutAnimation.configureNext(LayoutAnimation?.Presets?.linear)
}

const transitionSpec = {
    open: {
        animation: 'timing',
        config: {
            duration: 250,
            easing: Easing.inOut(Easing.ease),
        },
    },
    close: {
        animation: 'timing',
        config: {
            duration: 250,
            easing: Easing.inOut(Easing.ease),
        },
    },
};

const springTransitionSpec = {
    open: {
        animation: 'spring',
        config: {
            duration: 250,
            easing: Easing.inOut(Easing.ease),
        },
    },
    close: {
        animation: 'timing',
        config: {
            duration: 250,
            easing: Easing.inOut(Easing.ease),
        },
    },
};

export const BottomSheetTransition = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
}

export const HorizontalTransition = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

export const ModalTransition = {
    transitionSpec: springTransitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS
}
export const HITSLOP = {
    right: 10,
    left: 10,
    top: 10,
    bottom: 10,
};
export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 35;
export const KEYBOARD_VERTICAL_OFFSET = 80;
