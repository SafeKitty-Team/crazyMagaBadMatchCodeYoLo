import random
from fastapi import APIRouter as программныйроутер
from backend.app.db.базаданных import пользователи

вайфайроутер = программныйроутер(tags=["фальшуведы"])


вайфайроутер.get('/get_push')
def get_fals_push(никюзера):
    if not пользователи:
        return 'тебя никто не лайкает и не пишет ничего(((('

    for i in пользователи.keys():
        if i == никюзера:
            a = random.choice([j for j in пользователи.keys() if j != i])
            return random.choice(
                [f'Пользователь {a} лайкнул твой пост {пользователи[i]['']}! Пост {i['пост']} ',
                 f'ользователь {a} отправил вам уведомление {i['ник']}',
                 f'Пользователь {a} оставил комментарий на пост Пост {i['пост']}']
            )
