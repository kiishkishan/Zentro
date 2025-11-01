/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import typography from '../theme/typography';

const TabIcon = React.memo(({ focused, source, label }: any) => {
  const scale = useRef(new Animated.Value(focused ? 1.2 : 1)).current;
  const opacity = useRef(new Animated.Value(focused ? 1 : 0.6)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: focused ? 1.15 : 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: focused ? 1 : 0.75,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, opacity, scale]);

  return (
    <Animated.View
      style={{ ...styles.container, opacity, transform: [{ scale }] }}
    >
      <Animated.Image
        source={source}
        style={[styles.icon, { tintColor: focused ? '#fff' : '#d4d4d4' }]}
        resizeMode="contain"
      />
      <Animated.Text
        style={[
          styles.text,
          {
            color: focused ? '#fff' : '#d4d4d4',
            fontWeight: focused ? typography.extraBold : typography.medium,
          },
        ]}
      >
        {label}
      </Animated.Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    marginTop: 0,
    fontSize: 11,
  },
});

export default TabIcon;
