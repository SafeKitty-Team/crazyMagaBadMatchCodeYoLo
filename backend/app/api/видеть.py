import random
from fastapi import APIRouter as апироутер
from fastapi import Body
from backend.app.db.базаданных import пользователи, посты, смски

вайфайроутер = апироутер()


@вайфайроутер.get('/get_push', tags=["фальшуведы"])
def получитьслучсмс(никюзера):
    if not пользователи:
        return 'тебя никто не лайкает и не пишет ничего(((('

    for i in пользователи.keys():
        if i == никюзера:
            a = random.choice([j for j in пользователи.keys() if j != i])
            p = random.choice([i for i in посты[i]['посты']])
            return random.choice(
                [f'Пользователь {a} лайкнул твой пост {i}! Пост {p['название']}',
                 f' {i}, Пользователь {a} отправил вам уведомление',
                 f'Пользователь {a} оставил комментарий на пост {i} Пост {p['название']}']
            )


@вайфайроутер.post("/add_messege_q", tags=['смски'])
def добавитьсмску(password_from: str = Body(...),
                  pass_for: str = Body(...),
                  sms: str = Body(...)
                  ):
    global смски
    смски.append({(password_from, pass_for): sms})


@вайфайроутер.get('/get_mess', tags=['смски'])
def получить_смс(password_from: str, pass_for: str):
    s = []
    for sms in range(len(смски)):
        try:
            s.append(смски[sms][(password_from, pass_for)])
        except:
            continue

    return s

