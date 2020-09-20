on peut dans un select preselectionné ce qu'on veut
```JSX
<select>
    <option value={author._id}
        { if (author._id === book.author.id) {
    selected }
        }
    ></option>
</select>

```