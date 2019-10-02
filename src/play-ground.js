import classnames from 'classnames';
import React, {Component} from 'react';
import * as styles from './play-ground.module.scss';

const colorToStyleName = {
  red: 'redBox',
  green: 'greenBox',
  blue: 'blueBox',
  yellow: 'yellowBox'
};

function getStyleNameForColor(color) {
  return colorToStyleName[color] || '';
}

const computeResult= (actualColors, userColors) => {
  const isAValidSelection = actualColors.length === userColors.length && actualColors.every((color, index) => color === userColors[index]);

  const resultText = {
    true: 'Yaay!!!',
    false: 'Try Again!!'
  };

  return resultText[isAValidSelection];
};

const shuffleColors =  (colors) => {
  const shuffled = colors.slice();

  const swap = (arr, i, j) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

for(let index in colors) {
  swap(shuffled, index, Math.floor(Math.random() * colors.length));
}
return shuffled;
}

export class PlayGround extends Component {
  handleUserColorSelection = (color) => {
    this.setState({
      selectedColors: [...this.state.selectedColors, color]
    })

  };

  handleStartGame = () => {
    let counter = 0;
    this.setState({
      colors: shuffleColors(this.state.colors),
      enableColorSelection: false
    })

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

  }

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
    const result = computeResult(this.state.colors, this.state.selectedColors)
    console.dir(this.state)

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

