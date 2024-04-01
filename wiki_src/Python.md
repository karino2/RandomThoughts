[[プログラム言語]]

みんなだいすきPython。

### 整数を32bitの16進数にする

ちょろっとした確認で良くやりたくなるが、負数はちょっと面倒がある。

[how to convert negative integer value to hex in python - Stack Overflow](https://stackoverflow.com/questions/7822956/how-to-convert-negative-integer-value-to-hex-in-python)

基本的には`2**32-1`でアンドを取ればいい。

```python
hex(-3 & (2**32-1))
'{:#x}'.format(-3 & (2**32-1))
```