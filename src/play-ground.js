import classnames from 'classnames';
import React, {Component} from 'react';
import * as styles from './play-ground.module.scss';

const swapListIndices = (arr, i, j) => {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

// Randomizing the list items makes sure every time we get a different sequence of colors
const randomizeListItems =  (list) => {
  const randomizedList = list.slice();

  for(let index in list) {
    swapListIndices(randomizedList, index, Math.floor(Math.random() * list.length));
  }
  return randomizedList;
};

//List of colors used in the game
const colorToStyleName = {
  red: 'redBox',
  green: 'greenBox',
  blue: 'blueBox',
  yellow: 'yellowBox'
};

function getStyleNameForColor(color) {
  return colorToStyleName[color] || '';
}

// Validate user selection and displayed sequence to compute the result
const computeResult= (actualColors, userColors) => {
  const isAValidSelection = actualColors.length === userColors.length && actualColors.every((color, index) => color === userColors[index]);

  const resultText = {
    true: 'Congrats!!!',
    false: 'Try Again!!Click start button to restart'
  };

  return resultText[isAValidSelection];
};

export class PlayGround extends Component {
  handleUserColorSelection = (color) => {
    this.setState({
      selectedColors: [...this.state.selectedColors, color]
    })

  };

  handleStartGame = () => {
    let counter = 0;

    this.setState({
      colors: randomizeListItems(this.state.colors),
      enableColorSelection: false
    });

    const intervalId = setInterval(() => {
      this.setState({
        displayedColor: this.state.colors[counter]
      });
      counter += 1;
      if (counter === 5) {
        this.setState({
          displayedColor: '',
          enableColorSelection: true,
          selectedColors: []
        });
        clearInterval(intervalId);
      }
    }, 1000);

  };

  constructor(props) {
    super(props);
    this.state = {
      colors: Object.keys(colorToStyleName),
      displayedColor: '',
      enableColorSelection: false,
      selectedColors: []
    };
  }

  render() {
    const colorStyle = getStyleNameForColor(this.state.displayedColor);
    const result = computeResult(this.state.colors, this.state.selectedColors);

    return (
      <div className={styles.playGround}>
          <button
            className={styles.startGame}
            onClick={this.handleStartGame}
          >
            Start
          </button>
          <div className={classnames(styles.bigBox, styles[colorStyle])} />
          <div className={styles.gameInputArea}>
            <button
                className={classnames(styles.smallBox, styles.greenBox)}
                disabled={!this.state.enableColorSelection}
                onClick={() => this.handleUserColorSelection('green')}
            />
            <button
                className={classnames(styles.smallBox, styles.blueBox)}
                disabled={!this.state.enableColorSelection}
                onClick={() => this.handleUserColorSelection('blue')}
            />
            <button
                className={classnames(styles.smallBox, styles.redBox)}
                disabled={!this.state.enableColorSelection}
                onClick={() => this.handleUserColorSelection('red')}
            />
            <button
                className={classnames(styles.smallBox, styles.yellowBox)}
                disabled={!this.state.enableColorSelection}
                onClick={() => this.handleUserColorSelection('yellow')}
            />
          </div>
          <div className={styles.gameResult}>
             {
                 this.state.enableColorSelection &&
                 this.state.selectedColors.length === this.state.colors.length ? result : ''
             }
          </div>
      </div>
    );
  }
}

