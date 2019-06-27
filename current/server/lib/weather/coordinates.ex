defmodule Weather.Coordinates do
  @derive [Poison.Encoder]
  defstruct [:latitude, :longitude]
end
