import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 15,
    alignContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    marginVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20
  },
  background: {
    zIndex: -1,
    opacity: 1
  },
  input: {
    marginTop: 10,
    width: '100%'
  },
  inputButton: {
    marginTop: 10,
    marginRight: 100,
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  loader: {
    flex: 1,
    backgroundColor: 'white',
    height: 400,
    width: '100%',
    position: 'absolute',
    top: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    height: 5,
    width: 5
  }
});

export default styles;