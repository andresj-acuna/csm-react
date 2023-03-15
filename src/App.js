import './App.css';
import { useEffect } from 'react';
import aztec from './images/de_aztec.png';
import { init2d, game } from './csm/2dlive';


function App() {

    useEffect(() => {
        init2d(document, window);
    }, []);
    // function restartGame() {
    //     game.restartMatch();
    //   }

  return (
    <div className="container">
      <div id="controls" className="row">
      <div className="col-sm-12 text-center">
      <div id="control-playback-speed" className="btn-group">
        <a id="control-playback-speed-slow" className="btn btn-default">Slow</a>
        <a id="control-playback-speed-normal" className="btn btn-primary">Normal</a>
        <a id="control-playback-speed-fast" className="btn btn-default">Fast</a>
      </div>
      <div id="control-playback-round" className="btn-group">
        <a id="control-playback-round-previous" className="btn btn-default"><span className="glyphicon glyphicon-backward"></span></a>
        <a id="control-playback-round-pause-play" className="btn btn-default play-pause"><span className="glyphicon glyphicon-pause"></span></a>
        <a id="control-playback-round-replay" className="btn btn-default replay" style={{ display: "none" }} ><span className="glyphicon glyphicon-repeat"></span></a>
        <a id="control-playback-round-next" className="btn btn-default"><span className="glyphicon glyphicon-forward"></span></a>
      </div>
      </div>
      </div>
      <div className="row match-view">
      <div className="col-sm-12 viewPortContainer de_aztec">
          <div id="viewPortLayer" className="gameLayer text-center">
              <canvas id="viewPort" style={{ width: "876px", height: "474px", backgroundImage: `url(${aztec})` }} width="1752" height="948"></canvas>
          </div>
          <div id="matchMessage" className="gameLayer" style={{ display: "none" }}>
              <p className="lead text-center"></p>
              <p className="additional text-center"></p>
          </div>
          <div id="killHistory" className="gameLayer">
              <ul></ul>
          </div>
          <div id="scoreboardLayer" className="gameLayer" style={{ display: "none" }}>
              <div className="row" id="scoreboardCts">
                  <div className="col-sm-12">
                      <div className="table-responsive">
                          <table className="table table-condensed">
                              <thead>
                              <tr>
                                  <th className="text-right" style={{ width: "20%" }}>Team</th>
                                  <th className="text-left" style={{ width: "60%" }}>Player</th>
                                  <th className="text-right" style={{ width: "10%" }}>Money</th>
                                  <th className="text-right" style={{ width: "5%" }}>K</th>
                                  <th className="text-right" style={{ width: "5%" }}>D</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr id="scoreboard-away-clan-player-1" className="scoreboard-player" data-nick="olof">
                                  <td className="clan-tag text-right">cs.</td>
                                  <td className="nick-name text-left">olof</td>
                                  <td className="money text-right">$ 300</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-away-clan-player-2" className="scoreboard-player" data-nick="zAAz">
                                  <td className="clan-tag text-right">cs.</td>
                                  <td className="nick-name text-left">zAAz</td>
                                  <td className="money text-right">$ 150</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-away-clan-player-3" className="scoreboard-player" data-nick="tiro">
                                  <td className="clan-tag text-right">cs.</td>
                                  <td className="nick-name text-left">tiro</td>
                                  <td className="money text-right">$ 150</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-away-clan-player-4" className="scoreboard-player" data-nick="LOrdy">
                                  <td className="clan-tag text-right">cs.</td>
                                  <td className="nick-name text-left">LOrdy</td>
                                  <td className="money text-right">$ 150</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-away-clan-player-5" className="scoreboard-player" data-nick="refrezh">
                                  <td className="clan-tag text-right">cs.</td>
                                  <td className="nick-name text-left">refrezh</td>
                                  <td className="money text-right">$ 300</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>

                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
              <div className="row" id="scoreboardTs">
                  <div className="col-sm-12">
                      <div className="table-responsive">
                          <table className="table table-condensed">
                              <thead>
                              <tr>
                                  <th className="text-right" style={{ width: "20%" }}>Team</th>
                                  <th className="text-left" style={{ width: "60%" }}>Player</th>
                                  <th className="text-right" style={{ width: "10%" }}>Money</th>
                                  <th className="text-right" style={{ width: "5%" }}>K</th>
                                  <th className="text-right" style={{ width: "5%" }}>D</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr id="scoreboard-home-clan-player-1" className="scoreboard-player" data-nick="Ancash">
                                  <td className="clan-tag text-right">Ryonan</td>
                                  <td className="nick-name text-left">Ancash</td>
                                  <td className="money text-right">$ 0</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-home-clan-player-2" className="scoreboard-player" data-nick="Khabib">
                                  <td className="clan-tag text-right">Ryonan</td>
                                  <td className="nick-name text-left">Khabib</td>
                                  <td className="money text-right">$ 0</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-home-clan-player-3" className="scoreboard-player" data-nick="Draken">
                                  <td className="clan-tag text-right">Ryonan</td>
                                  <td className="nick-name text-left">Draken</td>
                                  <td className="money text-right">$ 0</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-home-clan-player-4" className="scoreboard-player" data-nick="Delight">
                                  <td className="clan-tag text-right">Ryonan</td>
                                  <td className="nick-name text-left">Delight</td>
                                  <td className="money text-right">$ 0</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              <tr id="scoreboard-home-clan-player-5" className="scoreboard-player" data-nick="Chemical">
                                  <td className="clan-tag text-right">Ryonan</td>
                                  <td className="nick-name text-left">Chemical</td>
                                  <td className="money text-right">$ 0</td>
                                  <td className="kills text-right">0</td>
                                  <td className="deaths text-right">0</td>
                              </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          <div id="tacticName" className="gameLayer text-center">
              <span>Pistol tactic: kamikaze rush backtab V3 (copy) (copy)</span>
          </div>
      </div>
      </div>
      <div className="row match-score">
      <div className="col-md-5 home-clan clan-t hidden-xs hidden-sm">
          <div className="col-md-10 home-clan-name text-right">Ryonan goes kamikaze</div>
          <div className="col-md-2 home-score text-right">0</div>
      </div>
      <div className="col-xs-12 away clan clan-t visible-xs visible-sm">
          <span className="home-clan-name">Ryonan goes kamikaze</span>
          <span className="home-score text-right pull-right">0</span>
      </div>
      <div className="col-xs-12 away-clan clan-ct visible-xs visible-sm">
          <span className="away-clan-name">Can't Stop goes kamikaze</span>
          <span className="away-score text-right pull-right">0</span>
      </div>
      <div id="round-timer" className="col-sm-12 col-md-2 text-center round-timer">01:23</div>
      <div className="col-md-5 away-clan clan-ct hidden-xs hidden-sm">
          <div className="col-md-2 away-score text-left">0</div>
          <div className="col-md-10 away-clan-name">Can't Stop goes kamikaze</div>
      </div>
      </div>
      <div id="information" className="row">
      <ul id="players-home-clan" className="information-clan-t col-md-6 col-sm-12 list-group">
          <li id="home-clan-player-1" className="list-group-item" data-nick="Ancash">
              <div className="player-1 player-name pull-left">Ancash</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(7/35)</div>
              <div className="player-weapon text-right pull-right">Deagle</div>
              <div className="clearfix"></div>
          </li>
          <li id="home-clan-player-2" className="list-group-item" data-nick="Khabib">
              <div className="player-2 player-name pull-left">Khabib</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(7/35)</div>
              <div className="player-weapon text-right pull-right">Deagle</div>
              <div className="clearfix"></div>
          </li>
          <li id="home-clan-player-3" className="list-group-item" data-nick="Draken">
              <div className="player-3 player-name pull-left">Draken</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(7/35)</div>
              <div className="player-weapon text-right pull-right">Deagle</div>
              <div className="clearfix"></div>
          </li>
          <li id="home-clan-player-4" className="list-group-item" data-nick="Delight">
              <div className="player-4 player-name pull-left">Delight</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(7/35)</div>
              <div className="player-weapon text-right pull-right">Deagle</div>
              <div className="clearfix"></div>
          </li>
          <li id="home-clan-player-5" className="list-group-item" data-nick="Chemical">
              <div className="player-5 player-name pull-left">Chemical</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(7/35)</div>
              <div className="player-weapon text-right pull-right">Deagle</div>
              <div className="clearfix"></div>
          </li>
      </ul>
      <ul id="players-away-clan" className="information-clan-ct col-md-6 col-sm-12 list-group">
          <li id="away-clan-player-1" className="list-group-item" data-nick="olof">
              <div className="player-1 player-name pull-left">olof</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">HE D</div>
              <div className="player-ammo text-right pull-right">(13/52)</div>
              <div className="player-weapon text-right pull-right">P2000</div>
              <div className="clearfix"></div>
          </li>
          <li id="away-clan-player-2" className="list-group-item" data-nick="zAAz">
              <div className="player-2 player-name pull-left">zAAz</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">V/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(13/52)</div>
              <div className="player-weapon text-right pull-right">P2000</div>
              <div className="clearfix"></div>
          </li>
          <li id="away-clan-player-3" className="list-group-item" data-nick="tiro">
              <div className="player-3 player-name pull-left">tiro</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">V/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(13/52)</div>
              <div className="player-weapon text-right pull-right">P2000</div>
              <div className="clearfix"></div>
          </li>
          <li id="away-clan-player-4" className="list-group-item" data-nick="LOrdy">
              <div className="player-4 player-name pull-left">LOrdy</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">V/-</div>
              <div className="player-items pull-left">-</div>
              <div className="player-ammo text-right pull-right">(13/52)</div>
              <div className="player-weapon text-right pull-right">P2000</div>
              <div className="clearfix"></div>
          </li>
          <li id="away-clan-player-5" className="list-group-item" data-nick="refrezh">
              <div className="player-5 player-name pull-left">refrezh</div>
              <div className="player-health text-right pull-left">+ 100</div>
              <div className="player-armor text-center pull-left">-/-</div>
              <div className="player-items pull-left">HE D</div>
              <div className="player-ammo text-right pull-right">(13/52)</div>
              <div className="player-weapon text-right pull-right">P2000</div>
              <div className="clearfix"></div>
          </li>
      </ul>
      </div>
    </div>

  );
}

export default App;
