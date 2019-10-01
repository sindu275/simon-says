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

export class PlayGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['red', 'green', 'blue', 'yellow'],
      selectedColor: ''
    };
  }

  componentDidMount() {
    let counter = 0;
    const intervalId = setInterval(() => {
      this.setState({
        selectedColor: this.state.colors[counter]
      })
      counter += 1;
      if (counter === 5) {
        this.setState({
          selectedColor: ''
        })
        clearInterval(intervalId);
      }
    }, 1000);

  }

  render() {
    const colorStyle = getStyleNameForColor(this.state.selectedColor);

    return (
      <div className={styles.playGround}>
          <div className={classnames(styles.bigBox, styles[colorStyle])} />
          <div className={styles.gameInputArea}>
            <div className={classnames(styles.smallBox, styles.greenBox)} />
            <div className={classnames(styles.smallBox, styles.blueBox)} />
            <div className={classnames(styles.smallBox, styles.redBox)} />
            <div className={classnames(styles.smallBox, styles.yellowBox)} />
          </div>
      </div>
    );
  }
}

