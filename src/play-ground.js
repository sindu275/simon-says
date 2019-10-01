import classnames from 'classnames';
import React, {Component} from 'react';
import * as styles from './play-ground.module.scss';

function getStyleNameForColor(color) {
  const colorToStyleName = {
    red: 'redBox',
    green: 'greenBox',
    blue: 'blueBox',
    yellow: 'yellowBox'
  };

  return colorToStyleName[color] || '';
}

const computeResult= (actualColors, userColors) => {
  const isAValidSelection = actualColors.length === userColors.length && actualColors.every((color, index) => color === userColors[index]);

  const resultText = {
    true: 'Success',
    false: 'Failed'
  };

  console.log(resultText[isAValidSelection])
  return resultText[isAValidSelection];
};

export class PlayGround extends Component {
  handleUserColorSelection = (color) => {
    this.setState({
      selectedColors: [...this.state.selectedColors, color]
    })

  };

  constructor(props) {
    super(props);
    this.state = {
      colors: ['red', 'green', 'blue', 'yellow'],
      displayedColor: '',
      selectedColors: []
    };
  }

  componentDidMount() {
    let counter = 0;
    const intervalId = setInterval(() => {
      this.setState({
        displayedColor: this.state.colors[counter]
      });
      counter += 1;
      if (counter === 5) {
        this.setState({
          displayedColor: ''
        });
        clearInterval(intervalId);
      }
    }, 1000);

  }

  render() {
    const colorStyle = getStyleNameForColor(this.state.displayedColor);
    const blah = computeResult(this.state.colors, this.state.selectedColors)

    return (
      <div className={styles.playGround}>
          <div className={classnames(styles.bigBox, styles[colorStyle])} />
          <div className={styles.gameInputArea}>
            <div className={classnames(styles.smallBox, styles.greenBox)} onClick={() => this.handleUserColorSelection('green')} />
            <div className={classnames(styles.smallBox, styles.blueBox)} onClick={() => this.handleUserColorSelection('blue')}/>
            <div className={classnames(styles.smallBox, styles.redBox)} onClick={() => this.handleUserColorSelection('red')}/>
            <div className={classnames(styles.smallBox, styles.yellowBox)} onClick={() => this.handleUserColorSelection('yellow')}/>
          </div>
        {
          this.state.selectedColors.length !== this.state.colors.length ?
              'Pick a small box color' :
              blah
        }
      </div>
    );
  }
}

