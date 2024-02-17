// play audio
export const play = async (playBack, uri) => {
  try {
    return await playBack.loadAsync({ uri }, { shouldPlay: true });
  } catch (error) {
    console.error("Error inside your play helper method", error.message);
  }
};

// pause audio
export const pause = async (playBack) => {
  try {
    return await playBack.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error) {
    console.error("Error inside your pause helper method", error.message);
  }
};
// resume audio
export const resume = async (playBack) => {
  try {
    return await playBack.playAsync();
  } catch (error) {
    console.error("Error inside your resume helper method", error.message);
  }
};

// select another audio
