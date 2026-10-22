import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  // The heart and bookmark each have their own animation value.
  const heartScale = useRef(new Animated.Value(1)).current;
  const bookmarkScale = useRef(new Animated.Value(1)).current;

  function handleLike() {
    setLiked((previous) => !previous);

    // A quick spring bounce gives the Like button tactile feedback.
    heartScale.setValue(0.8);

    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.2,
        friction: 3,
        tension: 180,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handleBookmark() {
    setSaved((previous) => !previous);

    // A small bounce acknowledges saving or unsaving the post.
    bookmarkScale.setValue(0.8);

    Animated.sequence([
      Animated.spring(bookmarkScale, {
        toValue: 1.2,
        friction: 3,
        tension: 180,
        useNativeDriver: true,
      }),
      Animated.spring(bookmarkScale, {
        toValue: 1,
        friction: 4,
        tension: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <View style={s.card}>
      <View style={s.header}>
        <View style={s.avatar}>
          <Text style={s.avatarText}>
            {post.username.slice(0, 2).toUpperCase()}
          </Text>
        </View>

        <View style={s.headerCopy}>
          <Text style={s.username}>{post.username}</Text>
          <Text style={s.location}>{post.location}</Text>
        </View>

        <Ionicons
          name="ellipsis-horizontal"
          size={21}
          color={colors.text}
        />
      </View>

      <Image source={post.image} style={s.image} />

      <View style={s.actions}>
        <Pressable
          onPress={handleLike}
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Unlike post' : 'Like post'}
          accessibilityState={{ selected: liked }}
          hitSlop={8}
        >
          <Animated.View
            style={{ transform: [{ scale: heartScale }] }}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={30}
              color={liked ? colors.accent : colors.text}
            />
          </Animated.View>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Comment on post"
          hitSlop={8}
        >
          <Ionicons
            name="chatbubble-outline"
            size={27}
            color={colors.text}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share post"
          hitSlop={8}
        >
          <Ionicons
            name="paper-plane-outline"
            size={27}
            color={colors.text}
          />
        </Pressable>

        <View style={s.spacer} />

        <Pressable
          onPress={handleBookmark}
          accessibilityRole="button"
          accessibilityLabel={saved ? 'Remove saved post' : 'Save post'}
          accessibilityState={{ selected: saved }}
          hitSlop={8}
        >
          <Animated.View
            style={{ transform: [{ scale: bookmarkScale }] }}
          >
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={27}
              color={saved ? colors.accent : colors.text}
            />
          </Animated.View>
        </Pressable>
      </View>

      <Text style={s.likes}>
        {post.likes + (liked ? 1 : 0)} likes
      </Text>

      <Text style={s.caption}>
        <Text style={s.username}>{post.username} </Text>
        {post.caption}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingBottom: 20,
    marginBottom: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 11,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
  headerCopy: {
    flex: 1,
  },
  username: {
    color: colors.text,
    fontWeight: '800',
  },
  location: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 0.95,
    backgroundColor: colors.panel,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
    paddingHorizontal: 14,
    paddingTop: 13,
  },
  spacer: {
    flex: 1,
  },
  likes: {
    color: colors.text,
    fontWeight: '800',
    paddingHorizontal: 14,
    marginTop: 11,
  },
  caption: {
    color: colors.text,
    paddingHorizontal: 14,
    marginTop: 7,
    lineHeight: 20,
  },
});
