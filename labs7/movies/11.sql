SELECT title FROM movies, ratings
WHERE movies.id = ratings.movie_id
AND id IN (SELECT movie_id FROM stars WHERE person_id IN (SELECT id FROM people WHERE name = 'Chadwick Boseman'))
ORDER BY rating DESC LIMIT 5;