const timAgoTag = document.getElementById('time_ago');
timAgoTag.text = util.timeAgo(timAgoTag.text, new Date());