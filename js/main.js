'use strict';

{
    const words = [
        'big',
        'blue',
        'phone',
        'red',
        'javascript',
        'watch'

    ]

    let word = words[Math.floor(Math.random() * words.length)];
    let loc = 0;
    let score = 0;
    let miss = 0;
    const timeLimit = 6 * 1000;
    let startTime = 3;
    let isPlaying = false;

    const target = document.getElementById('target');
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    const timerLabel = document.getElementById('timer');

    function updateTarget() {
        let placeholder = '';
        for (let i = 0; i < loc; i++) {
            placeholder += '_';
        }
        target.textContent = placeholder + word.substring(loc);
    }
    
    function updateTimer () {
        const timeLeft = startTime + timeLimit - Date.now();
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        const timeoutId  = setTimeout(() => {
            updateTimer ();    
        }, 10);
        if (timeLeft < 0) {
            isPlaying = false;
            clearTimeout(timeoutId);
            timerLabel.textContent = '0.00'
            setTimeout(() => {
                // alert('Game Over'); 
                showResult(); 
            }, 10);
            target.textContent = 'Click to replay !';
            
        }
    }
    function showResult() {
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
        alert (`${score} Letters, ${miss} Miss, ${accuracy.toFixed(2)}% accuracy`);

    }

    target.addEventListener('click', () => {
        if (isPlaying === true) {
            return;
        }
        isPlaying = true;
        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        word = words[Math.floor(Math.random() * words.length)];
        target.textContent = word;
        startTime = Date.now();
        updateTimer();
        
        
    });
    window.addEventListener('keydown', (e) =>{
        if (isPlaying !==true) {
            return;
        }
        console.log(e.key);
        if (e.key === word[loc]) {
            // console.log('ok');
            loc++;
            if (loc === word.length) {
                word = words[Math.floor(Math.random() * words.length)];
                loc = 0;
            }
            updateTarget();
            score++;
            scoreLabel.textContent = score;
        }else{
            console.log('fail');
            ++miss;
            missLabel.textContent = miss;
        }
    });













}