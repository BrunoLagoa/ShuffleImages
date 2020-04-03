import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';

import { images as imagesData } from './images';

import Tab from './Tab';
import GridImage from './GridImage';

const { width } = Dimensions.get('window');

export default function ShuffleImages() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [images, setImages] = useState([]);

  const ref = useRef(React.createRef());

  useEffect(() => {
    randomizeImages();
    ref.current.animateNextTransition();
  }, []);

  function selectTab(tabIndex) {
    ref.current.animateNextTransition();
    setSelectedTab(tabIndex);
  }

  async function randomizeImages() {
    const shuffledImages = await imagesData.sort(() => Math.random() - 0.5);

    ref.current.animateNextTransition();
    setImages(shuffledImages);
  }

  const transition = (
    <Transition.Together>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={2000} />
      <Transition.Change />
    </Transition.Together>
  );

  return (
    <Transitioning.View
      style={styles.container}
      ref={ref}
      transition={transition}>
      <View style={{ ...styles.tabContainer }}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            height: 70,
            width: (width - 30) / 2,
            backgroundColor: '#BADA55',
            left: selectedTab === 0 ? 0 : null,
            right: selectedTab === 1 ? 0 : null,
          }}
        />

        <TouchableOpacity style={styles.imageIcon} onPress={() => selectTab(0)}>
          <Tab icon="image" isSelected={selectedTab === 0 ? true : false} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageIcon} onPress={() => selectTab(1)}>
          <Tab icon="grid" isSelected={selectedTab === 1 ? true : false} />
        </TouchableOpacity>
      </View>

      {selectedTab === 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <GridImage key={image.id} image={image} width={width / 2 - 20} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <GridImage key={image.id} image={image} width={width / 4 - 20} />
            ))}
          </View>
        </ScrollView>
      )}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageIcon: {
    flex: 1,
  },

  tabContainer: {
    flexDirection: 'row',
    height: 70,
    width: width - 30,
    borderRadius: 70,
    marginTop: 50,
    marginHorizontal: 15,
    backgroundColor: 'lightgrey',
    overflow: 'hidden',
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
