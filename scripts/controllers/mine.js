'use strict';

/**
 * @ngdoc function
 * @name demineurApp.controller:MineCtrl
 * @description
 * # MineCtrl
 * Controller of the demineurApp
 */
angular.module('demineurApp')
  .controller('MineCtrl', ['$scope', function ($scope) {

    $scope.taille = 15;

    $scope.perdu = false;



    $scope.nouvellePartie = function(){
      $scope.perdu = false;
      $scope.minefield = createMinefield();
      for (var i = 1; i <= $scope.taille * $scope.taille/8; i++)
        placeRondomMine($scope.minefield);
    }


    //Creation du champs des mines
    function createMinefield() {
      var minefield = {};
      minefield.rows = [];
      for (var i = 0; i <= $scope.taille; i++) {
        var row = {};
        row.spots = [];
        for (var j = 0; j <= $scope.taille; j++) {
          var spot = {};

          //structure par defaut du spot
          spot.isCovered = true;
          spot.content = "empty";
          spot.row = i;
          spot.column = j;
          spot.image = null;
          spot.secteurVider = false;// voir si les 8 case proches sont déjà vidés

          row.spots.push(spot);
        }

        minefield.rows.push(row);
      }
      return minefield;
    }


    function getSpot(minefield, row, column) {
      return minefield.rows[row].spots[column];
    }

    //Calculer le nombre des mines dans les 8 cases les plus proches
    function calculeMinesProche(minefield, row, column) {
      var nbrMines = 0;
      for (var ir = row - 1; ir <= row + 1; ir++) {
        for (var ic = column - 1; ic <= column + 1; ic++) {
          if (ir != row || ic != column) {
            if (ir >= 0 && ir <= $scope.taille && ic >= 0 && ic <= $scope.taille) {
              if (getSpot(minefield, ir, ic).content == "mine")
                nbrMines++;
            }
          }
        }
      }
      return nbrMines;
    }


    //Geneation aleatoire des mines
    function placeRondomMine(minefield) {
      var row = Math.round(Math.random() * $scope.taille);
      var column = Math.round(Math.random() * $scope.taille);

      var spot = getSpot(minefield, row, column);
      spot.content = "mine";
      spot.isCovered = true;
    }





    //Vidage du spot courant
    $scope.vider = function (spot) {
      if (!$scope.perdu) {
        if (spot.content == "mine") {
          $scope.perdu = true;
          spot.isCovered = false;
          spot.image = "mine-wrong";
          afficherMines(spot);
        }
        else {
          spot.isCovered = false;
          spot.image = "empty";
          var nbrMinesProche = calculeMinesProche($scope.minefield, spot.row, spot.column);
          if (nbrMinesProche == 0) {
            if (!spot.secteurVider) {
              spot.secteurVider = true;
              viderSpotProche(spot);
            }
          }
          else
            spot.image = nbrMinesProche;
        }
      }

    }


    //Calculer les 8 cases les plus proches
    function viderSpotProche(spot) {
      for (var ir = spot.row - 1; ir <= spot.row + 1; ir++) {
        for (var ic = spot.column - 1; ic <= spot.column + 1; ic++) {
          if (ir != spot.row || ic != spot.column) {
            if (ir >= 0 && ir <= $scope.taille && ic >= 0 && ic <= $scope.taille) {
              if (!getSpot($scope.minefield, ir, ic).secteurVider)
                $scope.vider(getSpot($scope.minefield, ir, ic));
            }
          }
        }
      }
    }


    //Afficher tous les mines
    function afficherMines(currentmine) {
      for (var i = 0; i <= $scope.minefield.rows.length - 1; i++)
        for (var j = 0; j <= $scope.taille; j++) {
          if ($scope.minefield.rows[i].spots[j].content == "mine") {
            $scope.minefield.rows[i].spots[j].isCovered = false;
            $scope.minefield.rows[i].spots[j].image = "mine";
          }
        }

        currentmine.image = "mine-wrong";
    }

    //Lancement de la partie par defaut
    $scope.nouvellePartie();



  }




  ]);
