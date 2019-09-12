import * as React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';

import '../../styles/bootstrap.min.css'
import '../../styles/App.css'

import { IAppProps } from './IAppProps'
import Button from '../../components/Button/Button'
import { IAppState } from './IAppState';
import APIUtility from '../../utilities/APIUtility'
import MathUtility from '../../utilities/MathUtility'


class App extends React.Component<IAppProps, IAppState> {
  public state = {
    buttons: [],
    bars: [],
    limit: 0,
    selection: 0,
    error: '',
    loaded: false
  }

  public componentDidMount() {
    const apiUtility = new APIUtility();
    apiUtility
      .GetData(this.props.apiUrl)
      .then(response => {
        const barsc = response.data.bars.map((value: number, index: number) => {
          const progress = MathUtility.calculatePercentage(value, response.data.limit);
          return [index, progress, progress];
        })

        this.setState({
          buttons: response.data.buttons,
          bars: barsc,
          limit: response.data.limit,
          loaded: true
        })
      })
      .catch(error => {
        this.setState({
          loaded: true,
          error: error.message
        })
      });
  }

  public readonly changeProgress = (addValue: number): void => {
    const newBarArray = this.state.bars.map((bar: number[], index: number) => {
      if (bar[0] === this.state.selection) {
        bar[2] = bar[2] + addValue;
        let progress = 0;

        if (bar[2] > 100) {
          progress = 100
        }
        else if (bar[2] < 0) {
          progress = 0;
        }
        else {
          progress = bar[2]
        }

        bar[1] = progress;
      }

      return bar;
    })

    this.setState({
      bars: newBarArray
    })
  }

  public readonly changeSelection = (event: any) => {
    this.setState({
      selection: parseInt(event.target.value, 10)
    })
  }

  public render() {
    const progressBars = (this.state.loaded && this.state.error === '')
      ? this.state.bars.map((value: number[], index: number) => {
        return value[1] >= 100
          ? <ProgressBar key={index} now={value[1]} label={`${value[2]}%`} variant="danger" />
          : <ProgressBar key={index} now={value[1]} label={`${value[2]}%`} />
      })
      : null;

    const buttons = (this.state.loaded && this.state.error === '')
      ? this.state.buttons.map((value: number, index: number) => {
        return <Button key={index} value={value} click={this.changeProgress} />;
      }) : null;

    const progressBarSelectorOptions = (this.state.loaded && this.state.error === '')
      ? this.state.bars.map((value: number[], index: number) => {
        return <option key={index} value={value[0]}>Progress Bar {value[0] + 1}</option>;
      })
      : null;

    return (
      !this.state.loaded
        ? <div className="pb-wrapper">
          <ProgressIndicator label="Loading..." />
        </div>
        : this.state.error === '' ?
          <div className="pb-wrapper">
            <div className="pb-progress-bars">
              {progressBars}
            </div>
            <div className="pb-controls">
              <div className="pb-progress-bar-selector">
                <select className="pb-select" onChange={this.changeSelection}>
                  {progressBarSelectorOptions}
                </select>
              </div>
              <div className="pb-buttons">
                {buttons}
              </div>
            </div>
          </div> : <div className="pb-wrapper">
            <div className="pb-error">{this.state.error}</div>
          </div>
    )
  }
}

export default App;