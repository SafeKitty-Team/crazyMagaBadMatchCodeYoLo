import random
from fastapi import APIRouter as апироутер
from backend.app.db.базаданных import пользователи, посты

вайфайроутер = апироутер(tags=["фальшуведы"])


@вайфайроутер.get('/get_push')
def get_fals_push(никюзера):
    if not пользователи:
        return 'тебя никто не лайкает и не пишет ничего(((('

    for i in пользователи.keys():
        if i == никюзера:
            a = random.choice([j for j in пользователи.keys() if j != i])
            p = random.choice([i for i in посты[i]['посты']])
            return random.choice(
                [f'Пользователь {a} лайкнул твой пост {i}! Пост {p['название']}',
                 f'ользователь {a} отправил вам уведомление {i}',
                 f'Пользователь {a} оставил комментарий на пост {i} Пост {p['название']}']
            )
