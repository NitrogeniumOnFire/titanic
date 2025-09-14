fetch('charts_data.json').then(r=>r.json()).then(data=>{
  document.getElementById('top-feature').innerText = data.top_feature_text;

  function makeBar(ctx, labels, values, title){
    return new Chart(ctx,{type:'bar', data:{labels:labels, datasets:[{label:'Survival %', data:values}]}, options:{plugins:{title:{display:true,text:title}}, scales:{y:{beginAtZero:true}}}});
  }

  // Sex chart
  makeBar(document.getElementById('sexChart').getContext('2d'), data.by_sex.Sex, data.by_sex.survival_rate, 'Survival % by Sex');

  // Pclass chart
  makeBar(document.getElementById('pclassChart').getContext('2d'), data.by_pclass.Pclass, data.by_pclass.survival_rate, 'Survival % by Pclass');

  // Age group chart
  makeBar(document.getElementById('ageChart').getContext('2d'), data.by_agegrp.Age_group, data.by_agegrp.survival_rate, 'Survival % by Age group');

  // Embarked chart
  makeBar(document.getElementById('embarkedChart').getContext('2d'), data.by_embarked.Embarked, data.by_embarked.survival_rate, 'Survival % by Embarked');

  // Feature importances chart (horizontal)
  const featLabels = data.feature_importances.feature;
  const featVals = data.feature_importances.importance;
  new Chart(document.getElementById('featImpChart').getContext('2d'), {
    type:'bar',
    data:{labels:featLabels, datasets:[{label:'Importance', data:featVals}]},
    options:{indexAxis:'y', plugins:{title:{display:true,text:'Feature importances (RandomForest)'}}}
  });

}).catch(err=>{
  document.body.innerText = 'Failed to load charts_data.json: '+err;
});
